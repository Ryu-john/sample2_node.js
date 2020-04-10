const express = require('express')
const path = require('path')
const app = new express()
app.use(express.static('public'))

app.listen(4000, ()=>{
  console.log('App listening on port 4000')
})

