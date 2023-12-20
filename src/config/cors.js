require('dotenv').config()
//check bug : cros
const configCors = (app) => {
    app.use(function (req, res, next) {
        console.log(req.method);
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH', 'OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });
}

module.exports = configCors
