const jwt = require('jsonwebtoken')
require('dotenv').config();

const createJWT = (payload) => {
    try {
        let token = jwt.sign(payload, process.env.JWT_SECRET)
        return token;
    } catch (error) {
        console.log('error: ', error)
    }
}

const verifyToken = (token) => {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            console.log('error: ', err)
            return null;
        }
        return decoded
    });
}

module.exports = {
    createJWT,
    verifyToken
}