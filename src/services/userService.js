const db = require('../models/index')

const getAllUsersService = async () => {
    try {
        let users = await db.Users.findAll({
            raw: true,
            include: { model: db.groups, attributes: ['name', 'description'] },
            attributes: ['id', 'display_name', 'phone', 'email', 'gender', 'address'],
            nest: true
        })
        console.log('users: ', users);
        if (users) {
            return {
                EM: '',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: '',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const createUserService = () => {

}

const updateUserService = () => {

}

const deleteUserService = () => {

}

module.exports = {
    getAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService
}