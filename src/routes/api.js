const express = require('express')
const router = express.Router()
const { testApi, handleRegister, handleLogin } = require('../controllers/apiController')
router.get('/test-api', testApi)
router.post('/register', handleRegister)
router.post('/login', handleLogin)
module.exports = router //export default