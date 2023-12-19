const db = require('../models')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { getGroupWithRole } = require('./JWTService');
const { createJWT } = require('../middleware/JWTActions');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config
const checkEmailExist = async (email) => {
    let user = await db.Users.findOne({ where: { email: email }, raw: true })
    if (user) return true
    return false
}
const checkPhoneExist = async (phone) => {
    let user = await db.Users.findOne({ where: { phone: phone }, raw: true })
    if (user) return true
    return false
}
const handleRegisterService = async (rawDataUser) => {
    try {
        //check email/phone was exists
        const isEmailExist = await checkEmailExist(rawDataUser.email);
        if (isEmailExist) return {
            EM: 'The email is already exist',
            EC: 1
        }
        const isPhoneExist = await checkPhoneExist(rawDataUser.phone)
        if (isPhoneExist) return {
            EM: 'The phone number is already exist',
            EC: 1
        }
        //hash password
        const hashPassword = bcrypt.hashSync(rawDataUser.password, salt);
        //create new user
        await db.Users.create({
            email: rawDataUser.email,
            display_name: rawDataUser.display_name,
            password: hashPassword,
            phone: rawDataUser.phone,
            groupId: 4
        })
        return {
            EM: 'A user is the created successfully',
            EC: 0
        }
    } catch (error) {
        console.log(e);
        return {
            EM: 'Something wrong in service',
            EC: 2
        }
    }

}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLoginService = async (rawData) => {
    try {
        const userDB = await db.Users.findOne({
            where: {
                [Op.or]: [
                    {
                        email: rawData.valueLogin
                    },
                    {
                        phone: rawData.valueLogin
                    }
                ]
            },
            raw: true
        })
        if (userDB) {
            if (checkPassword(rawData.password, userDB.password)) {
                const groupInfo = await getGroupWithRole(userDB.groupId);
                const token = createJWT({
                    email: userDB.email,
                    groupInfo,
                    expiresIn: process.env.JWT_EXPIRESIN
                })
                return {
                    EM: `Welcome ${userDB.display_name} to my app`,
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupInfo,
                        email: userDB.email,
                        display_name: userDB.display_name
                    }
                }
            }
            return {
                EM: 'password is not exactly',
                EC: 1
            }
        }
        return {
            EM: 'Email or phone is invalid',
            EC: 1
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    handleRegisterService,
    handleUserLoginService
}