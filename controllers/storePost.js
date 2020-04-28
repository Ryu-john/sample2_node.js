const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = (req,res)=>{
  let image = req.files.image
  image.mv(path.resolve(__dirname,'..','public/img',image.name),async(error)=>{
    await BlogPost.create({
      ...req.body,
      image: '/img/'+image.name,
      userid: req.session.userId,
      if(error){
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors',validationErrors)
        req.flash('data', req.body)
        return res.redirect('/new')
      }
    })
    res.redirect('/')
  })
}