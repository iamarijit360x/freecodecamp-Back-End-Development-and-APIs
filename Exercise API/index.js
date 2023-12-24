const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
mongoose.connect("mongodb+srv://iamarijitx:FjrDQm1PNlZFEHJ1@first.xzxtt5z.mongodb.net/?retryWrites=true&w=majority")
const user_schema=mongoose.Schema(
  {
      username:{type:String,required:true}
  }
)
const exercise_schema=mongoose.Schema(
  {
      username:{type:String,required:true},
      description:{type:String,require:true},
      duration:{type:Number,required:true},
      date:{type:String}
  }
)
app.use(bodyParser.urlencoded({ extended: true }));
const User=mongoose.model("User",user_schema)
const Exercise=mongoose.model("Exercise",exercise_schema)

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users',(req,res)=>{
    const newUser=new User({username:req.body.username})
    newUser.save()
    console.log(newUser); 
    res.json({username:req.body.username,_id:newUser._id}) 
})
app.get('/api/users',async (req,res)=>{
 const users=await User.find({})
 res.send(users)
})
app.post('/api/users/:_id/exercises',async (req,res)=>{
  
  const username= (await User.findById(req.params._id))["username"]
  let date=new Date().toDateString()
  if(req.body.date)
    date=new Date(req.body.date).toDateString()

  const newExercise=new Exercise({username:username,description:req.body.description,duration:req.body.duration,date:date})
  newExercise.save()
console.log(newExercise) ; res.json({_id:req.params._id,username:username,date:newExercise.date,duration:newExercise.duration,description:newExercise.description})
})
app.get('/api/users/:_id/logs',async (req,res)=>{
const username= (await User.findById(req.params._id))["username"]

let fromDate=0
let toDate=new Date()
let limit=999999
if(req.query.from)
     fromDate = new Date(req.query.from)

if( req.query.to)
   toDate = new Date(req.query.to)
if(req.query.limit){
   limit = req.query.limit;
}

const log=await Exercise.find({username:username})

let result=log.filter((item)=>new Date(item.date) >= fromDate &&  new Date(item.date)<= toDate)
result=result.slice(0,limit)
console.log(req.url)
console.log(result)
res.json({_id:req.params._id,username:username,count:result.length,log:result})

})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
