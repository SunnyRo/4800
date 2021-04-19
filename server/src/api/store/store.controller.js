const pool = require("../../config/database");
const { getProductByType, getProductsFromStore, getStores } = require("./store.service");
module.exports = {
    allStore: (req, res) => {
        const key = req.body;
        getStores(key, async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            return res.send(results);
        });
    },
    productsByStore: (req, res) => {
        const key = req.body.store;
        getProductsFromStore(key, async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            return res.send(results);
        });

    },
    productsByType: (req, res) => {
        const key = req.body.type;
        getProductByType(key, async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            return res.send(results);
        });
    }
};
