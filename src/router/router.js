const express = require('express')
const router= express.Router()
const produkController=require('../controller/produkController')
const userController=require('../controller/userController')
const auth=require('../middleware/auth')

router.get('/user', auth, userController.getUser)
router.post('/user', auth, userController.createUser)
router.put('/user/:id',auth, userController.updateUser)
router.delete('/user/:id',auth, userController.deleteUser)
router.get('/user/:id',auth, userController.getById)

router.get('/produk',produkController.getData)
router.post('/produk',produkController.createData)
router.put('/produk/:id',produkController.updateData)
router.delete('/produk/:id',produkController.deleteData)
router.get('/produk/:id',produkController.getById)


module.exports = router;