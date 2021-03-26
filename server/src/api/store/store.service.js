const pool = require("../../config/database");
module.exports = {
    getProductByType: (type, callBack) => {
        pool.query(
            `SELECT Product.name as productname,Product.photo as productphoto,Store.photo as storephoto, Store.name as storename, unitPrice, quantity, address, phone \
             FROM Product JOIN Store ON Product.storeID=Store.storeID 
             WHERE Product.type=?`,
            [
                type
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },
    getProductsFromStore: (store, callBack) => {
        pool.query(
            `SELECT Product.name, Product.unitPrice, Product.type, Product.quantity, Product.photo
             FROM Product
             JOIN Store ON (Product.storeID=Store.storeID)
             WHERE Store.name=?`,
            [
                store,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },
    getStores: (store, callBack) => {
        pool.query(
            `SELECT * FROM Store`,
            [
                store
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },
};
