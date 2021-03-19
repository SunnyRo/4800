const router = require("express").Router();
const { getData, getProducts } = require("./store.controller");
//const { getProducts } = require("./store.service");
router.post("/stores", getData);
router.post("/products", getProducts);
module.exports = router;
