const express = require('express')
const router = express.Router()
const { testApi, handleRegister, handleLogin } = require('../controllers/apiController')
const { getListUsers, createUser, updateUser, deleteUser } = require('../controllers/userController')
const { getListGroup } = require('../controllers/groupController')
const { checkUserLogin, checkUserPermission } = require('../middleware/JWTActions')

router.all('*', checkUserLogin, checkUserPermission);
router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/user/getListUser', getListUsers)
router.post('/user/create', createUser)
router.put('/user/update/:userId', updateUser)
router.delete('/user/delete/:userId', deleteUser)
router.get('/group/get-list-group', getListGroup)
module.exports = router //export default