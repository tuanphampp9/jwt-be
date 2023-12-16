const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tuanpham', 'root', '123456', {
    host: 'localhost',
    port: '3307',
    dialect: 'mysql'
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connection