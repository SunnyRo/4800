const pool = require("../../config/database");
module.exports = {
    getProduct: (key, callBack) => {
        console.log(key)
        pool.query(
            `SELECT Product.name as productname,Product.photo as productphoto,Product.productID,Store.photo as storephoto, Store.name as storename, unitPrice, type, quantity, address, phone \
             FROM Product JOIN Store ON Product.storeID=Store.storeID 
             WHERE Product.name REGEXP ?`,
            [
                key
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
    getProductByType: (data, callBack) => {
        console.log(data)
        console.log("right there")
        pool.query(
            `SELECT Product.name as productname, Product.photo as productphoto,Product.productID,Store.name as storename, unitPrice, type, quantity, address, phone\
            FROM Product JOIN Store ON Product.storeID=Store.storeID 
            WHERE Product.name REGEXP ? and type REGEXP ?`,
            [
                data.searchterm,
                data.type
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
    getType: (callBack) => {
        pool.query(
            `SELECT DISTINCT type FROM Product`,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );

    }
};
