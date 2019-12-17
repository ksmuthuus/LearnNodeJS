const express = require('express')
const multer = require('multer')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

const avatar = multer({
// dest:'avatars',
limits:{
    fileSize:1000000
},
fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|png)$/)){
        cb(new Error('Invalid file format, allowed jpg, png'))
    }
    cb(undefined, true)
}
})


router.post('/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize(250,250).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (err, req, res, next) => {
    res.status(400).send({error: err.message})
})

router.delete('/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error('User Not Found!')
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

router.get('/me', auth, async (req, res) => {
    res.status(200).send(req.user)
    
})

 /**
   * @swagger
   * /api/users/login:
   *   post:
   *     description: Login to the application
   *     tags: [Users, Login]
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: User name.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   *         schema:
   *           type: object
   */
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