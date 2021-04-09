const router = require("express").Router();
const { check } = require('express-validator');
const { checkToken } = require("../../auth/authorization");
const { updateUserPassword, updateUserPhone, updateUserEmail, updateUserName, signup, login, logout, getProfile, refresh_token, addUserAddress, removeUserAddress } = require("./user.controller");
router.post("/signup",
    [
        check('email').isEmail(),
        check('email').isLength({ min: 5 }),
        check('password').isLength({ min: 5 }),
        check('phone').isNumeric(),
        check('phone').isLength({ min: 5 }),
    ]
    , signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh_token", refresh_token);
router.post("/profile", checkToken, getProfile);
router.post("/profile/removeaddress", checkToken, removeUserAddress);
router.post("/profile/addaddress",
    [
        check('number').isNumeric(),
        check('zipcode').isNumeric(),

    ]
    , checkToken, addUserAddress);
router.post("/profile/updatepassword",
    [
        check('password').isLength({ min: 5 }),
    ]
    , checkToken, updateUserPassword);
router.post("/profile/updatephone",
    [
        check('phone').isNumeric(),
        check('phone').isLength({ min: 5 }),
    ]
    , checkToken, updateUserPhone);
router.post("/profile/updatename",
    [
        check('firstName').isLength({ min: 2 }),
        check('lastName').isLength({ min: 2 }),
    ]
    , checkToken, updateUserName);
router.post("/profile/updateemail",
    [
        check('email').isEmail(),
        check('email').isLength({ min: 5 }),
    ]
    , checkToken, updateUserEmail);
module.exports = router;
