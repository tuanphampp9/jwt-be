const jwt = require('jsonwebtoken')
require('dotenv').config();

const nonSecurePath = ['/login', '/register']
const createJWT = (payload) => {
    try {
        let token = jwt.sign(payload, process.env.JWT_SECRET)
        return token;
    } catch (error) {
        console.log('error: ', error)
    }
}

const verifyToken = (token) => {
    const key = process.env.JWT_SECRET;
    try {
        let decoded = jwt.verify(token, key);
        return decoded;
    } catch (error) {
        console.log('err: ', error)
    }
}

const checkUserLogin = (req, res, next) => {
    if (nonSecurePath.includes(req.path)) return next();
    const cookies = req.cookies;
    if (cookies) {
        console.log(cookies.jwt);
        const token = cookies.jwt;
        const decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            return next();
        } else {
            return res.status(401).json({
                EM: 'INVALID TOKEN',
                EC: -1
            })
        }
    } else {
        return res.status(401).json({
            EM: 'NOT AUTHENTICATED THE USER',
            EC: -1
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePath.includes(req.path)) return next();
    if (req.user) {
        const { roles } = req.user.groupInfo
        const currentPath = req.path;
        const checkPermissionRole = roles.some((role) => role.url === currentPath);
        if (checkPermissionRole) {
            next();
        } else {
            console.log('check nefg');
            return res.status(403).json({
                EM: 'Permission denied',
                EC: -1
            })
        }
    } else {
        return res.status(401).json({
            EM: 'NOT AUTHENTICATED THE USER',
            EC: -1
        })
    }
}
module.exports = {
    createJWT,
    verifyToken,
    checkUserLogin,
    checkUserPermission
}