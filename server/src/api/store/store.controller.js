const pool = require("../../config/database");
//const { getProducts } = require("./store.service");
module.exports = {
    getData: (req, res) => {
        console.log(req);
        pool.query('SELECT * FROM Store', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        });
    },
    getProducts: (req, res) => {
        console.log(req.body);
        const body = req.body;
        pool.query(
            `SELECT Product.name, Product.unitPrice, Product.type, Product.quantity, Product.photo
                FROM Product
                JOIN Store ON (Product.storeID=Store.storeID)
                WHERE Store.name=?`,
            [
                body.store
            ],
            (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                }
                else {
                    console.log(err);
                }
            });
    }
    //getStoreProducts: (req, res) => {
    //console.log(req);
    //getProducts(req, res);
    //}
};
