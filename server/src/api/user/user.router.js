const router = require("express").Router();
const { check } = require('express-validator');
const { checkToken } = require("../../auth/authorization");
const { signup, login, logout, getProfile, refresh_token } = require("./user.controller");
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
module.exports = router;
