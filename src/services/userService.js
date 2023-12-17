const db = require('../models/index')

const getAllUsersService = async () => {
    try {
        let users = await db.Users.findAll({
            raw: true,
            include: { model: db.groups, attributes: ['name', 'description'] },
            attributes: ['id', 'display_name', 'phone', 'email', 'gender', 'address'],
            nest: true
        })
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

const getUserWidthPaginate = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const { count, rows } = await db.Users.findAndCountAll({
            include: { model: db.groups, attributes: ['name', 'description'] },
            attributes: ['id', 'display_name', 'phone', 'email', 'gender', 'address'],
            offset: offset,
            limit: limit,
            raw: true,
            nest: true
        });

        return {
            EM: 'fetch list user successfully',
            EC: 0,
            DT: {
                totalRows: count,
                totalPages: Math.ceil(count / limit),
                listUser: rows
            }
        }
    } catch (error) {
        console.log('err: ', error)
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
    deleteUserService,
    getUserWidthPaginate
}