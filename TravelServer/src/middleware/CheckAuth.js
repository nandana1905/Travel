const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1]
        console.log('token===>', token);

        const decodeToken = jwt.verify(token, 'private_key')
        console.log("decode==>", decodeToken);



        req.Data = {
            loginId: decodeToken.loginId,
            email:decodeToken.email,
            password: decodeToken.password,
            role: decodeToken.role,
        }

        console.log('Data==>', req.Data);

        next()

    } catch (error) {
        res.status(401).json({ message: 'Auth Failed please login' })
    }

}