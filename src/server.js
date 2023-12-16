const express = require('express')
const path = require('path');
require('dotenv').config()
const configViewEngine = require('./config/viewEngine')
const connection = require('./config/connectDB')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const configCors = require('./config/cors')
const app = express()
const port = process.env.PORT || 8080

//config cors
configCors(app);

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

//test connection
connection();
//config template engine
configViewEngine(app);
//declare routes
app.use('/api/v1/', apiRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})