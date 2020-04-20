const express = require('express')
const mongoose = require('mongoose')

const app = new express()
const ejs = require('ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const fileUpload = require('express-fileupload')

const homeController = require('./controllers/home.js')
const storePostController = require('./controllers/storePost.js')
const getPostController = require('./controllers/getPost.js')
const newPostController = require('./controllers/newPost.js')

const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

// const validateMiddleware = require("./middleware/validationMiddleware")
// app.use('/posts/store',validateMiddleware)

app.set('view engine','ejs')
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.listen(4000, ()=>{
  console.log('App listening on port 4000')
})

app.use(fileUpload())

app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store',storePostController)
app.get('/posts/new',newPostController)

app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)

app.get('/auth/login', loginController)
app.post('/users/login',loginUserController)

