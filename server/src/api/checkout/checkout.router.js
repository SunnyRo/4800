const router = require("express").Router();
const { checkToken } = require("../../auth/authorization");
const { completeOrder } = require("./checkout.controller");
router.post("/checkout", checkToken, completeOrder); 
module.exports = router;