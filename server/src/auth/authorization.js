const { verify } = require('jsonwebtoken');
const checkToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            // res.status(401).send({ error: "you need to login" })
            res.send({ token: "you need to login" })
        }
        // throw new Error('You need to login');
        const token = authorization && authorization.split(' ')[1];
        // console.log(token)
        if (token == null) return res.send({ token: "you need to login" })
        const { userEmail } = verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!userEmail) {
            console.log("user email is not match")
            res.send({ token: "you need to login" })
            // throw new Error()
        }
        req.userEmail = userEmail;
        next()
    } catch (error) {
        console.log(error)
        res.send({ token: "you need to login" })
        // res.status(401).send({ error: error.name })
    }
}
module.exports = {
    checkToken
};