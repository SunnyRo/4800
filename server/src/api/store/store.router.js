const router = require("express").Router();
const { productsByStore, allStore, productsByType } = require("./store.controller");
const { checkToken } = require("../../auth/authorization")
//const { getProducts } = require("./store.service");
router.post("/stores", checkToken, allStore);
router.post("/products", checkToken, productsByStore);
router.post("/type", checkToken, productsByType);
module.exports = router;
