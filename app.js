let express = require('express');
let jwt = require('jsonwebtoken');


const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');

let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJWT = require('passport-jwt').ExtractJwt;


let { mobiles,pincodes,reviews,users,orders,wishlist } = require('./data');

let app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,  authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});


const port = 5005;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let logs = [];




app.use(passport.initialize());





app.listen(port, () => console.log(`Server is listening on port ${port}`));

const params = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwtsecret5634278'
};

const jwtExpirySeconds = 30000;

let strategyAll = new JwtStrategy(params,function (token, done) {
  //console.log(token,users);  
  let user = users.find((a) => a.id === token.id);
    //console.log("User:", user);
    if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
    } else {
          
        return done(null, user);
    }
});
let strategyAdmin = new JwtStrategy(params,function (token, done) {
    //console.log('In JWTstratery', token);
    let user = users.find((a) => a.id===token.id);
    //console.log("User:", user);
    if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
    } else if (user.role !== 'admin') {
        return done(null, false, { message: 'You do not have admin role' });   
    }
    else {
        return done(null, user);
    }
});

passport.use('roleAll',strategyAll);
passport.use('roleAdmin', strategyAdmin);


app.get('/report',passport.authenticate('roleAdmin',{ session: false }), (req, res) => {
     const userId = req.user.id;
    const countOccurrences = (arr) =>
        arr.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});

    // Get products added to orders by the user
    const addedProducts = orders
        .filter((order) => order.userId === userId)
        .flatMap((order) => order.products);

    // Get most added products and their counts
    const mostAddedProducts = Object.entries(countOccurrences(addedProducts))
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([productId, count]) => ({
            product: mobiles.find((product) => product.id === parseInt(productId)),
            count,
        }));

    // Get most searched products and their counts (based on added products)
    const mostSearchedProducts = mostAddedProducts;

    // Get most favorite products and their counts
    const favoriteProducts = wishlist
        .filter((item) => item.userId === userId)
        .map((item) => item.productId);

    const mostFavoriteProducts = Object.entries(countOccurrences(favoriteProducts))
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([productId, count]) => ({
            product: mobiles.find((product) => product.id === parseInt(productId)),
            count,
        }));

    // Return the report
    res.json({
        mostAddedProducts,
        mostSearchedProducts,
        mostFavoriteProducts,
    });
});

app.post('/upload', upload.single('csvFile'),passport.authenticate('roleAdmin',{ session: false }), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const csvData = req.file.buffer.toString();
  parseCSVData(csvData)
    .then((parsedProducts) => {
      mobiles = parsedProducts;
      res.json({ message: 'CSV uploaded successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error processing CSV' });
    });
});


app.get('/download',passport.authenticate('roleAdmin',{ session: false }), (req, res) => {
  if (mobiles.length === 0) {
    return res.status(404).json({ message: 'No products available for download' });
  }

  const csvStream = csv.format({ headers: true });
  csvStream.pipe(res);

  mobiles.forEach((product) => {
    csvStream.write(product);
  });

  csvStream.end();
});



app.post('/user', function (req, res) {
  //console.log('Request Body:', req.body);
    let email = req.body.email;
    let password = req.body.password;
    let user = users.find((a) => a.email === email && a.password === password);
    if (user) {
        let payload = { id: user.id,clickedUrl: req.originalUrl };
        let token = jwt.sign(payload, params.secretOrKey, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds,
        });
        logs.push({
          userId: user.id,
          timestamp: new Date(),
          action: 'URL click',
          url: req.originalUrl,
        });
        res.send({token:"bearer "+token});
    } else
        res.status(404).send('Login Failed');
});

app.get('/user', passport.authenticate('roleAll',{ session: false }), function (req, res) {
    logs.push({
          userId: req.user.id,
          timestamp: new Date(),
          action: 'URL click',
          url: req.originalUrl,
        });
    res.send(req.user);
});
app.get('/logs', passport.authenticate('roleAdmin',{ session: false }), function (req, res) {
    res.json(logs);
});

app.get('/wishlist', passport.authenticate('roleAll',{ session: false }), function (req, res) {
  let list = wishlist.find((a) => a.user === req.user.email);
   logs.push({
          userId: req.user.id,
          timestamp: new Date(),
          action: 'URL click',
          url: req.originalUrl,
        });
  if (list) {
    res.json(list);
  } else {
    let wish = {
      user: req.user.email,
      products: []
    };
    res.json(wish);
  }
});
app.post('/wishlist', passport.authenticate('roleAll',{ session: false }), function (req, res) {
  let  product  = req.body.product;
  logs.push({
          userId: req.user.id,
          timestamp: new Date(),
          action: 'URL click',
          url: req.originalUrl,
        });
  if (product) {
      let ind = wishlist.findIndex((a) => a.user === req.user.email);
      if (ind>=0) {
        let findProd = wishlist[ind].products.findIndex((a) => a.id === product.id);
        if (findProd >= 0) {
          wishlist[ind].products.splice(findProd, 1);
        } else {
          wishlist[ind].products.push(product);
        }
      } else {
        let list = {
          user: req.user.email,
          products: [
            product
          ]
        };
        wishlist.push(list);
      } 
      res.json({ message: 'Product added' });
  } else {
    res.send('product not found');
  }
});
app.get('/orders', passport.authenticate('roleAll',{ session: false }), function (req, res) {
  let ord = orders.find((a) => a.user === req.user.email);
   logs.push({
          userId: req.user.id,
          timestamp: new Date(),
          action: 'URL click',
          url: req.originalUrl,
        });
  if (ord) {
    res.json(ord);
  } else {
    res.status(401).send({message:'Not found'});
  }
});
app.post('/orders', passport.authenticate('roleAll',{ session: false }), function (req, res) {
   logs.push({
          userId: req.user.id,
          timestamp: new Date(),
          action: 'URL click',
          url: req.originalUrl,
        });
  let { order } = req.body;
  let ind = orders.findIndex((a) => a.user === req.user.email);
  if (ind>=0) {
    for (let a of orders) {
      orders[ind].products.push(a);
    }
  } else {
    let list = {
      user: req.user.email,
      products: order
    };
    orders.push(list);
  } 
  res.status(200).json({ message: 'Order added' });
});
app.get('/products/:category/:brand?', function (req, res) {
   let { category, brand } = req.params;
  let {page,ram,rating,price,sort,q} = req.query;
  page = page ? page : 1;
  let filteredProducts = mobiles.filter((a)=>a.category===category);
  let arr = filteredProducts;
  if (brand) {
        arr = mobiles.filter((a) => a.brand === brand);
  }
  if (ram) {
    const conditions = ram.split(',');
    let fileredArr = arr.filter(product => {
        return conditions.every(condition => {
            let [operator, value] = condition.split('=');
            value = parseInt(value);
            switch (operator) {
                case '>=':
                    return product.ram >= value;
                case '<=':
                    return product.ram <= value;
                default:
                    return product.ram === value;
            }

        });
    });
    arr = fileredArr;
  }
  if (rating) {
    const ratings = rating.split(',');
    for (let r of ratings) {
      //console.log(r);
      const ratingValue = parseFloat(r[1]);
       arr = arr.filter(product => product.rating > ratingValue);
    }
  }
  if (price) {
    const prices = price.split(',');
    for (let r of prices) {
      let [min, max] = r.split('-');
      min = parseInt(min);
      max = parseInt(max);
      //console.log(min, max);
       arr = arr.filter(product => product.price >= min && product.price<=max);
    }
  }
  if (q) {
  let filteredProducts = arr.filter(product => {
    return product.name.toLowerCase().includes(q.toLowerCase());
  });
  arr = filteredProducts
}
  if (sort) {
    if (sort === 'asc') {
      arr.sort((a, b) => {
        return (a.price) - (b.price);
      });
    }
    else if (sort === 'desc') {
      arr.sort((a, b) => {
        return (b.price) - (a.price);
      });
    }
    else if (sort === 'popularity') {
      arr.sort((a, b) => {
        return (a.popularity) - (b.popularity);
      });
    }
  }
  let respArr = pagination(arr, page);
  let len = arr.length;
  let quo = Math.floor(len / 10);
  let rem = len % 10;
  let extra = rem === 0 ? 0 : 1
  let numofpages = quo + extra;
  let pageInfo = { pageNumber: page, numberOfPages: numofpages, numOfItems: respArr.length, totalItemCount: arr.length };
  res.json({
    pageInfo: pageInfo,
    mobiles: respArr,

  });
});

app.get('/deals', (req, res) => {

  const shuffled = mobiles.sort(() => 0.5 - Math.random());
  const random = shuffled.slice(0, 14);
  res.json(random);
});
app.get('/product/:id', (req, res) => {
  let { id } = req.params;
  let prod = mobiles.find((a) => a.id === id);
  if (prod) {
    res.json(prod);
  } else {
    res.status(401).send({message:'Product not found'});
  }
});
app.post('/product',passport.authenticate('roleAdmin',{ session: false }), (req, res) => {
  let product = req.body;
  if (product) {
    mobiles.push(product);
    res.json('Product Added!!');
  } else {
    res.status(401).send({message:'Product not found'});
  }
});
app.put('/product',passport.authenticate('roleAdmin',{ session: false }), (req, res) => {
  let product = req.body;
  let prod = mobiles.findIndex((a) => a.id === product.id);
  if (prod>=0) {
    mobiles[prod] = product;
    res.json('Product Updated!!');
  } else {
    res.status(401).send({message:'Product not found'});
  }
});
app.get('/pincode/:code/:id', (req, res) => {
  let { id, code } = req.params;
  let prod = pincodes.find((a) => a.pincode === code && a.mobileList.find((b)=>b.id===id));
  if (prod) {
    res.json(prod);
  } else {
    res.status(401).send({message:'Not Deliverable'});
  }
});
app.get('/reviews/:id', (req, res) => {
  let { id } = req.params;
  let prod = reviews.find((a) => a.mobileId === id);
  if (prod) {
    res.json(prod);
  } else {
    res.status(401).send({message:'No reviews available'});
  }
});

function parseCSVData(csvData) {
  return new Promise((resolve, reject) => {
    const parsedProducts = [];

    csv.parseString(csvData, { headers: true })
      .on('data', (row) => {
        const product = {
          id: row.id,
          name: row.name,
          price: row.price,
          img: row.img,
          details: row.details,
          brand: row.brand,
          category: row.category,
          EMI: row.EMI,
          assured: row.assured,
          offers: row.offers,
          rating:row.rating
        };
        parsedProducts.push(product);
      })
      .on('end', () => resolve(parsedProducts))
      .on('error', (error) => reject(error));
  });
}

function pagination(obj, page) {
  var resArr = obj;
  resArr = resArr.slice(page * 10 - 10, page * 10);
  return resArr;
}

