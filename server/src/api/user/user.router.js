const router = require("express").Router();
const { checkToken } = require("../../auth/authorization");
const { updateUserImage, updateUserPassword, updateUserPhone, updateUserEmail, updateUserName, signup, login, logout, getProfile, refresh_token, addUserAddress, removeUserAddress } = require("./user.controller");
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh_token", refresh_token);
router.post("/profile", checkToken, getProfile);
router.post("/profile/removeaddress", checkToken, removeUserAddress);
router.post("/profile/addaddress", checkToken, addUserAddress);
router.post("/profile/updatepassword", checkToken, updateUserPassword);
router.post("/profile/updatephone", checkToken, updateUserPhone);
router.post("/profile/updatename", checkToken, updateUserName);
router.post("/profile/updateemail", checkToken, updateUserEmail);
router.post("/profile/updateimage", updateUserImage);
module.exports = router;
