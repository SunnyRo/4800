const router = require("express").Router();
const { getData, getProducts } = require("./store.controller");
const { checkToken } = require("../../auth/authorization")
//const { getProducts } = require("./store.service");
router.post("/stores", checkToken, getData);
router.post("/products", checkToken, getProducts);
module.exports = router;
