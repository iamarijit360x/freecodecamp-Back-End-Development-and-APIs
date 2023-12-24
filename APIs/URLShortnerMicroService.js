///URL Shortener Microservice

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); //ADD
const dns=require('dns');



app.use(bodyParser.urlencoded({ extended: true })); //ADD

let count=1 //ADD
let obj={} //ADD

// Basic Configuration
const port = 3000;

app.use(cors());

app.use('/', express.static(`${process.cwd()}/`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl',(req,res)=>{
     let url=req.body.url
     const hostname = new URL(url).hostname;
     dns.lookup(hostname,(err,address)=>{
      if(err){
            res.json({ error: 'invalid url' })
      }
      else
      {
            let url_obj={original_url :url,short_url:count}
            obj[count]=url_obj
            count++
            console.log(obj)
            res.json(url_obj)
      }
      })
     
      
})

app.get('/api/shorturl/:x',(req,res)=>{
      console.log('f')
      const short_url=req.params.x
      res.redirect(obj[short_url].original_url)

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
