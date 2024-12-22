const { UserRegisterModel } = require('../MODEL/userRegisterModel');
const bcryptjs = require('bcryptjs');
const validators = require('validator');
const jwt = require('jsonwebtoken');

exports.userSave = async (request, response) => {
    try {
        const { username, email, password } = request.body
        const isUserExist = await UserRegisterModel.findOne({ email })
        if (isUserExist) return response.status(400).json({ "status": 400, "message": "User already exist create new record" });
        if (!validators.isEmail(email)) return response.status(400).json({ "status": 400, "message": "Invalid EmailId" });
        await UserRegisterModel.create({ username, email, password }).then((res) => {
            return response.status(200).json({ "status": 200, "message": "Saved Successfully", "data": res })
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}

exports.login = async (request, response) => {
    try {
        const data = request.body
        const { email, password } = data
        await UserRegisterModel.findOne({ email }).then((res) => {
            if (res === null) return response.status(400).json({ "status": 400, "message": "Invalid User details" })
            if (password === res.password) {
                const options = {
                    expiresIn: '1h',
                };
                const token = jwt.sign(data, process.env.JWT_SECRET_KEY, options);
                return response.status(200).json({ "status": 200, "message": "Login Successfully", "data": { ...res, token } })
            } else {
                return response.status(400).json({ "status": 400, "message": "Invalid User details" })
            }
        })
    } catch (err) {
        return response.status(400).json({ "status": 400, "message": err.message })
    }
}