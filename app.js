let express = require('express');
let axios = require('axios');


let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});



const port = 2410;
app.listen(port, () => console.log(`Server is listening on port ${port}`));



app.post('/myserver', async (req, res) => {
  try {
    const { method, fetchURL, data } = req.body;

    if (method === 'GET') {
      const response = await axios.get(fetchURL);
      res.json(response.data);
    } else if (method === 'POST') {
      const response = await axios.post(fetchURL, data);
      res.json(response.data);
    } else {
      res.status(400).json({ error: 'Invalid method' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  res.send("not found");
});


app.listen(port, () => console.log(`Node app listening on port ${port}!`));
