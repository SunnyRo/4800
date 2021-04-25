const { getProduct, getProductByType, getType } = require("./search.service");

module.exports = {
    searchProduct: (req, res) => {
        console.log("Controller searchProduct")
        const key = req.body.searchterm;
        getProduct(key, async (err, results) => {
            if (err) {
                console.log('errorSQL: getProduct\n', err);
            }
            return res.send(results);
        });
    },
    searchProductByType: (req, res) => {
        console.log("Controller searchProductByType")
        const key = req.body;
        getProductByType(key, async (err, results) => {
            if (err) {
                console.log('errorSQL: getProductByType\n', err);
            }
            return res.send(results);
        });
    },
    Type: (req, res) => {
        console.log("Controller Type")
        getType(async (err, results) => {
            if (err) {
                console.log('errorSQL: getType\n', err);
            }
            return res.send(results);
        });
    },
};
