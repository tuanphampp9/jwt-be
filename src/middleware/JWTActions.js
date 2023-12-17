const jwt = require('jsonwebtoken')
require('dotenv').config();

const createJWT = () => {
    try {
        let token = jwt.sign({ name: 'tuan pham', address: 'ha noi' }, process.env.JWT_SECRET)
        console.log(token);
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
        console.log(decoded)
        return decoded
    });
}

module.exports = {
    createJWT,
    verifyToken
}