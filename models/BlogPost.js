const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  datePosted:{ /* can declare property type with an object like this because wi need 'default' */
    type: Date,
    default: new Date()
  }
})

const BlogPost = mongoose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost