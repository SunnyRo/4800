const { verify } = require('jsonwebtoken');
const checkToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            res.status(401).send({ error: "you need to login" })
        }
        // throw new Error('You need to login');
        const token = authorization && authorization.split(' ')[1];
        // console.log(token)
        if (token == null) return res.sendStatus(401)
        const { userEmail } = verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!userEmail) {
            console.log("user email is not match")
            throw new Error()
        }
        req.userEmail = userEmail;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: error.name })
    }
}
module.exports = {
    checkToken
};