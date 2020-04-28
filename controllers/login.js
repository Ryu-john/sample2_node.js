module.exports = (req,res) =>{
  var username = ""
  var password = ""
  const data = req.flash('data')[0]
  const message = req.flash('failed')

  if(typeof data !="undefined"){
    username = data.username
    password = data.password
  }

  res.render('login',{
    username: username,
    password: password,
    message: message
  })
}