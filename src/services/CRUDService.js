const connection = require('../config/database')
const db = require('../models')
const getAllUsers = async () => {
    try {
        const results = await db.Users.findAll(
            {
                raw: true,
                include: { model: db.groups, attributes: ['name', 'description'] },
                attributes: ['id', 'display_name', 'phone', 'email'],
                nest: true
            }
        );
        const role = await db.roles.findAll({
            raw: true, include: { model: db.groups, where: { id: 2 }, },
            nest: true
        })
        console.log('roles: ', role);
        console.log('info: ', results);
        return results;
    } catch (error) {
        console.log(error);

    }
    // const [results] = await connection.query(
    //     `select * from Employees`,
    // )
    // return results
}

const getOneUser = async (userId) => {
    const employee = await db.Users.findOne({ where: { id: userId } });
    if (employee === null) {
        console.log('Not found!');
    } else {
        return employee;
    }
    // const [result] = await connection.query(
    //     `select * from Employees where id=?`,
    //     [userId]
    // )
}

const updateOneUser = async (infoUpdate, userId) => {
    const result = await db.Users.update(infoUpdate, {
        where: {
            id: userId
        }
    });
    return result;
    // const [results] = await connection.query(
    //     `update Employees
    //     set email=?, name=?, city=?
    //     where id=${userId}`,
    //     [infoUpdate.email, infoUpdate.name, infoUpdate.city]
    // )
}
const createOneUser = async (infoCreate) => {
    try {
        let results = await db.Users.create({
            display_name: infoCreate.display_name,
            phone: infoCreate.phone,
            email: infoCreate.email,
            password: infoCreate.password,
            gender: infoCreate.gender,
            groupId: 1
        })
        return results;
    } catch (error) {
        console.log('error: ', error)
    }

    // const [results] = await connection.query(
    //     `insert into Employees (email,name,city)
    //     values(?,?,?)`,
    //     [infoCreate.email, infoCreate.name, infoCreate.city]
    // )

}
const deleteUser = async (userId) => {
    const result = await db.Users.destroy({
        where: {
            id: userId
        }
    });
    return result;
}
module.exports = {
    getAllUsers,
    getOneUser,
    updateOneUser,
    createOneUser,
    deleteUser
}