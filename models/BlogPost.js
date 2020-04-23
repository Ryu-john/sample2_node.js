const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datePosted:{ /* can declare property type with an object like this because wi need 'default' */
    type: Date,
    default: new Date()
  },
  image: String
})

const BlogPost = mongoose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost