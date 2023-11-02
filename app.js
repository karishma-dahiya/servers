var express = require("express");
let { products,users } = require('./storeData');
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, , authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});
let port = 5005;


app.listen(port, () => console.log(`Node app listening on port ${port}!`));

app.get('/products', (req, res) => {
    //console.log(products);
        res.send(products);
    
});
app.get('/products/category/:cat', (req, res) => {
    let { cat } = req.params;
    if (cat) {
        let prod = products.filter((a) => a.category === cat);
        res.send(prod);
    } 
});
app.get('/products/:id', (req, res) => {
    let { id } = req.params;
    let prod = products.find((a) => a.prodCode === id);
    if (prod) {
        res.send(prod);
    } else {
        res.status(401).send("Product not available")
    }
});
app.post('/products', (req, res) => {
    let prod = req.body;
    let findProd = products.find((a) => a.prodCode === prod.prodCode);
    if (findProd) {
        res.status(401).json({message:'Product with this code is already present'})
    } else {
        products.push(prod);
         res.status(200).send('Product Added');
    }
});
app.put('/products/:id', (req, res) => {
    let prod = req.body;
    let { id } = req.params;
    let findProdInd = products.findIndex((a) => a.prodCode === id);
    if (findProdInd >= 0) {
        products[findProdInd] = prod;
         res.status(200).send('Product Updated');
    } else {
         res.status(401).json({message:'Could not find product'})
    }
});
app.delete('/products/:id', (req, res) => {
    let { id } = req.params;
    let findProdInd = products.findIndex((a) => a.prodCode === id);
    //console.log(id,findProdInd);
    if (findProdInd >= 0) {
        products.splice(findProdInd, 1);
         res.status(200).send('Product Deleted');
    } else {
        res.status(401).send('Could not find Product');
    }
});
app.post('/login', (req, res) => {
    let { email, password } = req.body;
    let user = users.find((a) => a.email === email && a.password === password);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(401).json({error:'Incorrect Email or password'})
    }
})
