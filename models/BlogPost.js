const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: [true,'Please provide title']
  },
  body: {
    type: String,
    required:[true,'Please provide body']
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datePosted:{ /* can declare property type with an object like this because wi need 'default' */
    type: Date,
    default: new Date()
  },
  image: {
    type: String,
    required:[true,'Please select image']
  }
})

const BlogPost = mongoose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost