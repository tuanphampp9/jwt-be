const db = require('../models/index')
const getGroupWithRole = async (groupId) => {
    //scope
    try {
        const roles = await db.groups.findOne({
            attributes: ['id', 'name', 'description'],
            where: {
                id: groupId
            },
            include: { model: db.roles, attributes: ['id', 'url', 'description'], through: { attributes: [] } },
            nest: true
        })
        return roles;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getGroupWithRole
}