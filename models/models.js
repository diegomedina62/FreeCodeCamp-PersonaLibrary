const mongoose = require("mongoose")

//creation of schema

const BookSchema = new mongoose.Schema({

  title:{type:String,required:[true,"missing required field title"]},
  commentcount:{type:Number,default:0},
  comments:[String]
})

module.exports= mongoose.model("Book",BookSchema)