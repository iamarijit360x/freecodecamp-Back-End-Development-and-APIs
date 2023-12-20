// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api',(req,res)=>{
  let d = new Date().toString();
  d=d.slice(0,3)+','+d.slice(4,28)
  res.json({unix:Date.now(),utc:d})
})
app.get('/api/:date',(req,res)=>{
  let unix
  let x=req.params.date
  const pattern = /^\d+$/;
  if(pattern.test(x)){
    x=Number(x)
    unix=x
  }
  let newDate=new Date(x)
  unix=newDate.getTime()
  if(newDate=='Invalid Date')
    res.json({ error : "Invalid Date" })

  let d = new Date(x).toString();
  d=d.slice(0,3)+', '+d.slice(8,10)+' '+d.slice(4,7)+d.slice(10,28)
 
  res.json({unix:unix,utc:d})
})





// listen for requests :)
 app.listen(5000)
