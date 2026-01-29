const express = require('express'), 
router= express.Router()
const produkController=require('../controller/produkController')
const userController=require('../controller/userController')
const Auth=require('../middleware/auth')

router.get('/', Auth, produkController.getData)
router.post('/', Auth, produkController.createData)
router.put('/:id',Auth, produkController.updateData)
router.delete('/:id',Auth, produkController.deleteData)

router.get('/user', Auth, userController.getUser)
router.post('/register', userController.createUser)
router.put('/user/:id',Auth, userController.updateUser)
router.delete('/user/:id',Auth, userController.deleteUser)

router.post('/login', userController.login)

router.get('/user/:id',userController.getById)
router.get('/:id',produkController.getById)

module.exports = router;