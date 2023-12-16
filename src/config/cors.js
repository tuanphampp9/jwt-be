require('dotenv').config()
//check bug : cros
const configCors = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH', 'OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}

module.exports = configCors
