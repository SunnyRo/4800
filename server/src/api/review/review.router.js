const router = require("express").Router();
const { checkToken } = require("../../auth/authorization");
const { getProductReview, addProductReview } = require("./review.controller");
router.post("/add", checkToken, addProductReview);
router.post("/", checkToken, getProductReview);
module.exports = router;