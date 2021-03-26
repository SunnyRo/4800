const { getProduct, getProductByType, getType } = require("./search.service");

module.exports = {
    searchProduct: (req, res) => {
        const key = req.body.searchterm;
        getProduct(key, async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            return res.send(results);
        });
    },
    searchProductByType: (req, res) => {
        const key = req.body;
        console.log("right here right there")
        getProductByType(key, async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            return res.send(results);
        });
    },
    Type: (req, res) => {
        getType(async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            console.log(results)
            return res.send(results);
        });
    },
};
