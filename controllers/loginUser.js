const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req,res) =>{
  const { username, password } = req.body

  User.findOne({username:username}, (error,user) =>{
    if(user){
      bcrypt.compare(password, user.password, (error, same) =>{
        if(same){
          req.session.userId = user._id
          res.redirect('/')
        }
        else{
          //パスワードが間違っている
          req.flash('data',req.body)
          req.flash('failed','※パスワードが間違っています')
          res.redirect('/auth/login')
        }
      })
    } 
    else{
      // ユーザーネームが間違っている
      req.flash('data',req.body)
      req.flash('failed','※入力されたユーザーネームは登録されていません')
      res.redirect('/auth/login')
    }
  })
}