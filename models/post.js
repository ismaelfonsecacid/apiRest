const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = mongoose.Schema({
  title:String,
  miniature: String,     // optional
  content: String,
  path: {
    type: String,
    unique:true,
  }  ,
  created_at: Date,
})

PostSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Post",PostSchema)