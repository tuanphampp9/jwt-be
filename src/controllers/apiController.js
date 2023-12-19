const { handleRegisterService, handleUserLoginService } = require("../services/apiService")

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        const { email, phone, password } = req.body
        if (!email || !phone || !password) {
            return res.status(200).json({
                EM: 'Missing required parameters',//error message
                EC: 1,//error code
                DT: ''
            })
        }
        //service
        const dataService = await handleRegisterService(req.body)
        return res.status(200).json({
            ...dataService,
            DT: 'ok'
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',//error message
            EC: '-1',//error code
            DT: ''
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        const infoUser = req.body;
        const data = await handleUserLoginService(infoUser);
        if (data && data?.DT && data?.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',//error message
            EC: '-1',//error code
            DT: ''
        })
    }

}
module.exports = {
    testApi,
    handleRegister,
    handleLogin
}