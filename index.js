const express = require('express')
const mongoose = require('mongoose')

const app = new express()
const ejs = require('ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const expressSesstion = require('express-session')
app.use(expressSesstion({
  secret: 'keyboard cat'
}))

// authenticate get in posts/store and posts/new 
const authMiddleware = require('./middleware/authMiddleware')
// Autenticated bind in register and login
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

// file involve
const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.set('view engine','ejs')
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.listen(4000, ()=>{
  console.log('App listening on port 4000')
})

// post section involve
const homeController = require('./controllers/homePage.js')
const storePostController = require('./controllers/storePost.js')
const getPostController = require('./controllers/getPost.js')
const newPostController = require('./controllers/newPost.js')

app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store',authMiddleware, storePostController)
app.get('/posts/new',authMiddleware, newPostController)

// create user involve
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)

// login user involve
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

//logout user involve
const logoutController = require('./controllers/logout')

app.get('/auth/logout', logoutController)

// const validateMiddleware = require("./middleware/validationMiddleware")
// app.use('/posts/store',validateMiddleware)

// after loggin hide navbar
global.loggedIn = null
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId,
  next()
})

// 404 page
app.use((req,res) => res.render('notfound'))