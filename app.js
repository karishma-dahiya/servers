
let express = require('express');
let axios = require('axios');


let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-reqs',
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


app.post('/getServer', async (req, res) => {
  let { url, body, headers } = req.body;
  let { hValue1, hValue2, hValue3, hKey1, hKey2, hKey3 } = headers;
  let header = {};
 if (hKey1 && hValue1) {
    header[hKey1] = hValue1;
  }
  if (hKey2 && hValue2) {
    header[hKey2] = hValue2;
  }
  if (hKey3 && hValue3) {
    header[hKey3] = hValue3;
  }
  //console.log(header,headers);
  try {
    const response = await axios.get(url,{headers:header});
    res.json(response.data);
  } catch (error) {
    //console.log(error);
    //res.send(error)
    res.status(401).json({error:error})
  }
})

app.post('/myserver', async (req, res) => {
  let { url, body, headers } = req.body;
  let { hValue1, hValue2, hValue3, hKey1, hKey2, hKey3 } = headers;
  let header = {};
  if (hKey1 && hValue1) {
    header[hKey1] = hValue1;
  }
  if (hKey2 && hValue2) {
    header[hKey2] = hValue2;
  }
  if (hKey3 && hValue3) {
    header[hKey3] = hValue3;
  }
  try {
      const response = await axios.post(url, JSON.parse(body),{headers:header});
      res.json(response.data);
    
  } catch (error) {
    res.status(401).json({ error: error });
  }
});
app.post('/putserver', async (req, res) => {
  let { url, body, headers } = req.body;
  let { hValue1, hValue2, hValue3, hKey1, hKey2, hKey3 } = headers;
  let header = {};
  if (hKey1 && hValue1) {
    header[hKey1] = hValue1;
  }
  if (hKey2 && hValue2) {
    header[hKey2] = hValue2;
  }
  if (hKey3 && hValue3) {
    header[hKey3] = hValue3;
  }
  try {
      const response = await axios.put(url, JSON.parse(body),{headers:header});
      res.json(response.data);
    
  } catch (error) {
    res.status(401).json({ error: error });
  }
});
app.post('/delete', async (req, res) => {
  let { url, body, headers } = req.body;
  let { hValue1, hValue2, hValue3, hKey1, hKey2, hKey3 } = headers;
  let header = {};
  if (hKey1 && hValue1) {
    header[hKey1] = hValue1;
  }
  if (hKey2 && hValue2) {
    header[hKey2] = hValue2;
  }
  if (hKey3 && hValue3) {
    header[hKey3] = hValue3;
  }
  try {
    
      const response = await axios.delete(url,{headers:header});
      res.json(response.data);
    
  } catch (error) {
    res.status(401).json({ error: error });
  }
});


 


