
const express=require('express')
const app=express()
const multer=require('multer')
app.use(express.static('./'))
const upload=multer({dest:'/'})
//parse form data
//app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
      res.json( )
})

app.post('/api',upload.single('upfile'),(req,res)=>{
      let obj_metadata={}
      obj_metadata.name=req.file.filename
      obj_metadata.type=req.file.mimetype
      obj_metadata.size=req.file.size
      res.json(obj_metadata)
      

})
app.listen(5050)
