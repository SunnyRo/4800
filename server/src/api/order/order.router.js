const router = require("express").Router();
const { checkToken } = require("../../auth/authorization");
const { completeOrder, getUserOrders, getUserOrderDetail } = require("./order.controller");
router.post("/checkout", checkToken, completeOrder);
router.post("/user", checkToken, getUserOrders);
router.post("/detail", checkToken, getUserOrderDetail);
module.exports = router;