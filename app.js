const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./usermodel.js');
const post = require('./postmodel.js');
const comment = require('./commentmodel.js');

// PUT MONGODB DATABASE URL HERE
url='mongodb+srv://clashingtech44:jgeT7zboazo3q4UT@cluster0.3mlhw4j.mongodb.net/'

const mongoDbURI = url
mongoose.connect(mongoDbURI)
    .then(() => console.log('connected'))
    .catch(() => console.log('error'));

app.use(bodyParser.urlencoded({ extended: true }));

//add user by giving username, password and phone no
app.post("/adduser",async(req,res) => {
    user.create({username:req.body.username, password:req.body.password,phoneno:req.body.phoneno})
    res.send("user added")
})

//add post by given username of the person who is posting , title and content 
app.post("/addpost",async(req,res) => {
   ref_user=await user.findOne({username:req.body.username})
   post.create({ref_user:ref_user._id,title:req.body.title,content:req.body.content})
   res.send("post added for "+ref_user.username)
})

//add comment by giving post_id you want to comment on, username of person who is commenting and content
app.post("/addcomment",async(req,res) => {
    ref_post=await post.findOne({_id:req.body.id})
    ref_user=await user.findOne({username:req.body.username})
    console.log(ref_post)
    comment.create({ref_post:ref_post._id,ref_user:ref_user._id,content:req.body.content})
    .then(() =>res.send("comment added for "+ ref_post._id+ref_user.username))
    .catch((err)=>res.send('cant add commnet'))
 })

// get all the posts from newest to oldest
app.get('/home', async(req,res)=>{
    all_posts= await post.find().sort({time:1})
    res.json(all_posts)
})

// get all the posts from a user newest to oldest by giving query as ?username=...
app.get('/posts', async(req,res)=>{
    ref_user=await user.findOne({username:req.query.username})
    console.log(ref_user,ref_user._id)
    all_posts= await post.find({ref_user:ref_user._id}).sort({time:1})
    res.json(all_posts)
})


app.listen(8000,()=>{
    console.log("server started")
}
)