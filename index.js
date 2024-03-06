require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns'); 
const bodyParser = require('body-parser');
const isUrl = require('is-url');

// Basic Configuration
const port = process.env.PORT || 3000;
let counter = 1;
const shortUrl = {};

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:id', (req, res)=>{
  let id = req.params.id;
  console.log(shortUrl[id]);
  shortUrl[id] ? res.redirect(shortUrl[id]) 
  : res.json({error:	"No short URL found for the given input"});
});

app.post('/api/shorturl',(req, res)=>{
  if(!isUrl(req.body.url)){
    res.json({ error: 'invalid url' });
  } else {
    shortUrl[counter] = req.body.url;
    res.json({original_url: shortUrl[counter], short_url: counter});
    counter += 1;
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
