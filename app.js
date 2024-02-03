const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/UserInfo'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection    

con.on('open', function(){
    console.log('connected...')
})

app.use(express.json())

con.on('open', () => {
    console.log('connected...')
})

const userRouter = require('./routers/userRouter')
app.use('/users',userRouter)

app.listen(9000, () => {
    console.log('Server started')
})