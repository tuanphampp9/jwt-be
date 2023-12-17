const { getListGroupService } = require("../services/groupService")

const getListGroup = async (req, res) => {
    try {
        const dataService = await getListGroupService();
        return res.status(200).json(dataService)
    } catch (error) {
        return res.status(500).json({
            EM: error,//error message
            EC: '-1',//error code
            DT: ''
        })
    }
}

module.exports = { getListGroup }