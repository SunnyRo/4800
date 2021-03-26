const router = require("express").Router();
const { checkToken } = require("../../auth/authorization");
const { searchProduct, searchProductByType, Type } = require("./search.controller");
router.post("/products", checkToken, searchProduct);
router.post("/type", Type);
router.post("/products/type", checkToken, searchProductByType);
module.exports = router;
