const jwt = require('jsonwebtoken')
require('dotenv').config();

const nonSecurePath = ['/login', '/register']
const createJWT = (payload) => {
    try {
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
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
    const tokenFromHeader = extractToken(req);
    if (cookies || tokenFromHeader) {
        const token = cookies?.jwt ? cookies?.jwt : tokenFromHeader;
        const decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
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
    if (nonSecurePath.includes(req.path) || req.path === '/account') return next();
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

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

module.exports = {
    createJWT,
    verifyToken,
    checkUserLogin,
    checkUserPermission
}