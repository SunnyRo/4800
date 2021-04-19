const { getAllOrders, updateAnOrder } = require("./staff.controller")
const router = require("express").Router();
router.post("/orders", getAllOrders);
router.post("/update", updateAnOrder);
module.exports = router;
