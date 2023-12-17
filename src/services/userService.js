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
            include: { model: db.groups, attributes: ['id', 'name', 'description'] },
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

const createUserService = async (infoUser) => {
    try {
        //check email/phone was exists
        const isEmailExist = await checkEmailExist(infoUser.email);
        if (isEmailExist) return {
            EM: 'The email is already exist',
            EC: 1
        }
        const isPhoneExist = await checkPhoneExist(infoUser.phone)
        if (isPhoneExist) return {
            EM: 'The phone number is already exist',
            EC: 1
        }

        await db.Users.create(infoUser)
        return {
            EM: 'created successfully',
            EC: 0,
            DT: ''
        };
    } catch (error) {
        console.log('error: ', error)
    }
}

const updateUserService = async (infoUpdate, userId) => {
    try {
        await db.Users.update(infoUpdate, {
            where: {
                id: userId
            }
        });
        return {
            EM: 'updated successfully',
            EC: 0,
            DT: ''
        };
    } catch (error) {
        console.log('error: ', error)
    }
}

const deleteUserService = async (userId) => {
    try {
        await db.Users.destroy({
            where: {
                id: userId
            }
        });
        return {
            EM: 'Deleted',
            EC: 0,
            DT: ''
        };
    } catch (error) {
        console.log('error: ', error)
    }

}

module.exports = {
    getAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
    getUserWidthPaginate
}