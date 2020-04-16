const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = new express()
const ejs = require('ejs')

const bodyParser = require('body-parser')

const BlogPost = require('./models/BlogPost')

const fileUpload = require('express-fileupload')

app.set('view engine','ejs')
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.listen(4000, ()=>{
  console.log('App listening on port 4000')
})

app.use(fileUpload())

app.get('/',async (req,res)=>{
  const blogposts = await BlogPost.find({})
  res.render('index',{
    blogposts
  })
})

app.get('/about',(req,res)=>{
  res.render('about')
})

app.get('/contact',(req,res)=>{
  res.render('contact')
})

app.get('/post/:id',async (req,res)=>{
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post',{
    blogpost
  })
})

app.get('/posts/new',(req,res)=>{
  res.render('create')
})

app.post('/posts/store', (req,res)=>{
  let image = req.files.image
  image.mv(path.resolve(__dirname,'public/img',image.name),async(error)=>{
    await BlogPost.create({
      ...req.body,
      image:'/img/'+image.name
    })
    res.redirect('/')
  })
})

