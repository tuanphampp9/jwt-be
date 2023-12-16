const connection = require('../config/database')
const bcrypt = require('bcryptjs');
const { getAllUsers, getOneUser, createOneUser, updateOneUser, deleteUser } = require('../services/CRUDService')

const salt = bcrypt.genSaltSync(10);

const getHomePage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results });
}
const getFormCreateUser = (req, res) => {

    res.render('create.ejs');
}
const postCreateUser = async (req, res) => {
    const { email, display_name, password, phone, gender } = req.body;
    // es6
    // connection.query(
    //     `insert into Users (email,name,city)
    //     values(?,?,?)`,
    //     [email, name, city],
    //     function (err, results) {
    //         res.send('Created user success')
    //     }
    // );
    const hashPassword = bcrypt.hashSync(password, salt);

    //to check password after hash
    // const check = bcrypt.compareSync(password, hashPassword);
    // console.log('check pass: ', check);
    // es7
    let results = await createOneUser({ email, display_name, password: hashPassword, phone, gender });
    return res.send('Created user success');
}
const getFormUpdateUser = async (req, res) => {
    let result = await getOneUser(req.params.userId);
    res.render('update.ejs', { infoUser: result });
}
const postUpdateUser = async (req, res) => {
    const { email, name, city } = req.body;
    let results = await updateOneUser({ email, name, city }, req.params.userId);
    return res.redirect('/')
}
const getFormDeleteUser = async (req, res) => {
    const userId = req.params.userId;
    const infoUser = await getOneUser(userId);
    res.render('delete.ejs', { infoUser })
}
const postDeleteUser = async (req, res) => {
    const { userId } = req.params;
    const result = await deleteUser(userId);
    res.redirect('/');

}
module.exports = {
    getHomePage,
    postCreateUser,
    getFormCreateUser,
    getFormUpdateUser,
    postUpdateUser,
    getFormDeleteUser,
    postDeleteUser
}