const { sign } = require('jsonwebtoken');

// Create tokens
const createAccessToken = userEmail => {
    return sign({ userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m', });
};
const createRefreshToken = userEmail => {
    return sign({ userEmail }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h', });
};
// send tokens
const sendAcessToken = (res, req, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email,
    });
};
const sendTokens = (res, req, name, city, zipcode, refreshtoken, accesstoken) => {
    console.log('send request token');
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: "/refresh_token",
    });
    res.send({
        accesstoken,
        email: req.body.email,
        name: name,
        address: city + ' ' + zipcode,
    });
};
module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAcessToken,
    sendTokens
};