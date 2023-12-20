
const { getAllUsersService, getUserWidthPaginate, createUserService, updateUserService, deleteUserService } = require("../services/userService")
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const getListUsers = async (req, res) => {
    try {
        const { page, limit } = req.query;
        if (page && limit) {
            const dataService = await getUserWidthPaginate(parseInt(page), parseInt(limit));
            return res.status(200).json(dataService)
        } else {
            const dataService = await getAllUsersService();
            return res.status(200).json(dataService)
        }

    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',//error message
            EC: '-1',//error code
            DT: ''
        })
    }
}

const createUser = async (req, res) => {
    try {
        console.log('req create: ', req.user);
        const { email, display_name, password, phone, gender, address, groupId } = req.body;
        const hashPassword = bcrypt.hashSync(password, salt);
        const dataService = await createUserService({ email, display_name, password: hashPassword, phone, gender, address, groupId: parseInt(groupId) });
        return res.status(200).json(dataService)
    } catch (error) {
        return res.status(500).json({
            EM: `error from server, ${error}`,//error message
            EC: -1,//error code
            DT: ''
        })
    }

}

const updateUser = async (req, res) => {
    try {
        const { display_name, gender, address, groupId } = req.body;
        const userId = req.params.userId;
        const dataService = await updateUserService({ display_name, gender, address, groupId: parseInt(groupId) }, userId)
        return res.status(200).json(dataService)
    } catch (error) {
        return res.status(500).json({
            EM: `error from server, ${error}`,//error message
            EC: -1,//error code
            DT: ''
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const dataService = await deleteUserService(userId);
        return res.status(200).json(dataService)
    } catch (error) {
        return res.status(500).json({
            EM: `error from server, ${error}`,//error message
            EC: -1,//error code
            DT: ''
        })
    }
}

const getInfoAccount = (req, res) => {
    try {
        console.log('req.user: ', req.user)
        res.status(200).json({
            EM: 'ok',
            EC: 0,
            DT: {
                access_token: req.token,
                infoUser: req.user
            }
        })
    } catch (error) {
        return res.status(500).json({
            EM: `error from server, ${error}`,//error message
            EC: -1,//error code
            DT: ''
        })
    }
}
module.exports = {
    getListUsers,
    createUser,
    updateUser,
    deleteUser,
    getInfoAccount
}