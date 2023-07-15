const mongoose = require('mongoose');
// Define a schema
const postdetails = new mongoose.Schema({
  ref_user:{type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title:String,
  content:String,
  time:{
    type:Date,
    default: Date.now
  }
});

// Create a model based on the schema
module.exports= mongoose.model('post', postdetails);

