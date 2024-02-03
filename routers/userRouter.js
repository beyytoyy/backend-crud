const express = require('express')
const router = express.Router()
const User = require('../models/users')

const validateUser = (req, res, next) => {
    const { name, email, age} = req.body
    if (!name || !email ||  !age) {
        return res.status(400).send('Name, email, and age are required.')
    }
    next()
}

router.get('/', async(req,res) => {
    try{
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit

            const users = await User.find().skip(skip).limit(limit).sort({ createdAt: -1 })
            res.json(users)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
            const user = await User.findById(req.params.id)
            if(!user){
                return res.status(404).send('User not found')
            }
            res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const { name, email, age } = req.body
    const user = new User({
        name,
        email,
        age
    })

    try{
        const a1 = await user.save()
        res.json(a1)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

router.put('/:id', async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if(!user){
            return res.status(404).send('User not found')
        }
        res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.patch('/:id', async(req,res) => {
    try{ 
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send('User not found')
        }
        user.sub = req.body.sub
        const a1 = await user.save()
        res.json(a1)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id) 
        if(!user){
            return res.status(404).send('User not found')
        }
        res.json(user)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

router.head('/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            res.status(200).end()
        }else{
            res.status(404).end()
        }
    }catch(err){
        res.status(500).end().send('Error ' + err)
    }
})

router.options('/', (req,res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type, Authorization')
    res.status(200).end()
})

module.exports = router

