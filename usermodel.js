const mongoose = require('mongoose');
// Define a schema
const usersdetails = new mongoose.Schema({
   username:{
    type: String,
    required: true,
    unique: true
   } ,
   password:String,
   phoneno:Number
});

// Create a model based on the schema
module.exports= mongoose.model('user', usersdetails);

