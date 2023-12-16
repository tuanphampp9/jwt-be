
const { getAllUsersService } = require("../services/userService")
const getListUsers = async (req, res) => {
    try {
        const dataService = await getAllUsersService();
        return res.status(200).json(dataService)
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',//error message
            EC: '-1',//error code
            DT: ''
        })
    }
}

const createUser = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = {
    getListUsers,
    createUser,
    updateUser,
    deleteUser
}