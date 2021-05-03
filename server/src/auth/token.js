const { sign } = require('jsonwebtoken');

// Create tokens
const createAccessToken = userEmail => {
    return sign({ userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30min', });
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
const sendTokens = (res, req, image, id, name, number, street, city, zipcode, refreshtoken, accesstoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: "/refresh_token",
    });
    res.send({
        accesstoken,
        email: req.body.email,
        customerID: id,
        name: name,
        fulladdress: number + ' ' + street + ' ' + city + ' ' + zipcode,
        address: city + ' ' + zipcode,
        image: '/' + image
    });
};
module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAcessToken,
    sendTokens
};