const pool = require("../../config/database");
const { getProductByType, getProductsFromStore, getStores } = require("./store.service");
module.exports = {
    allStore: (req, res) => {
        console.log("Controller allStore")
        const key = req.body;
        getStores(key, async (err, results) => {
            if (err) {
                console.log('errorSQL: getStores\n', err);
            }
            return res.send(results);
        });
    },
    productsByStore: (req, res) => {
        console.log("Controller productsByStore")
        const key = req.body.store;
        getProductsFromStore(key, async (err, results) => {
            if (err) {
                console.log('errorSQL: getProductsFromStore\n', err);
            }
            return res.send(results);
        });

    },
    productsByType: (req, res) => {
        console.log("Controller productsByType")
        const key = req.body.type;
        getProductByType(key, async (err, results) => {
            if (err) {
                console.log('errorSQL: getProductsFromStore\n', err);
            }
            return res.send(results);
        });
    }
};
