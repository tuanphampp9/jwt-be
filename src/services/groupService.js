const db = require('../models/index')

const getListGroupService = async () => {
    try {
        const infoGroup = await db.groups.findAll({
            raw: true,
            attributes: ['id', 'name', 'description'],
            order: [['name', 'ASC']]
        })
        return {
            EM: 'ok',
            EC: 0,
            DT: infoGroup
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getListGroupService
}