const express = require('express')
const router = express.Router()
const User = require('../models/user')
const returnError = require('../common/error')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
    res.status(200).send(req.user)
    
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        await req.user.save()
        res.status(200).send()
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.post('/logoutAll', auth, async(req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    }
    catch(err){
        res.status(500).send(err)
    }
})

// router.get('/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        return res.status(201).send({user, token})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.patch('/me', auth,async (req, res) => {
    const updateFields = Object.keys(req.body)
    const allowedFields = ['name', 'email', 'password','age']
    const isUpdateAllowed = updateFields.every(field => allowedFields.includes(field))
    if (!isUpdateAllowed) {
        return res.status(400).send('Invalid Request')
    }

    //Schema.Pre middleware skipped for this so adopt an alternate approach to save via user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    // })

    try{
        // const user=User.findById(req.params.id)
        // if (!user) {
        //     return res.status(400).send()
        // }

        updateFields.forEach(field => req.user[field] = req.body[field])
        await req.user.save()
        return res.status(200).send(req.user)
    }
    catch(err){
        res.status(500).send({error:err.message})
    }
})


router.delete('/me', auth, async (req, res) => {
    // const user = await User.findByIdAndDelete(req.params.id)
    // if (!user) return res.status(404).send('User Not Found!')
    try{
        await req.user.remove()
        res.status(200).send(req.user)
    }
  catch(err){
      res.status(500).send(err)
  }  
   
})

module.exports = router