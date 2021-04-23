const pool = require("../../config/database");
module.exports = {
    getProductByType: (type, callBack) => {
        pool.query(
            `SELECT Product.name as productname,Product.photo as productphoto,Product.productID,Store.photo as storephoto, Store.name as storename,Product.rating,Product.numberofreviews, unitPrice, quantity, address, phone,type \
             FROM Product JOIN Store ON Product.storeID=Store.storeID 
             WHERE Product.type=?`,
            [
                type
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProductsFromStore: (store, callBack) => {
        pool.query(
            `SELECT Product.name as productname,Product.photo as productphoto,type,Product.productID,Store.photo as storephoto, Store.name as storename,Product.rating,Product.numberofreviews, unitPrice, quantity, address, phone \
             FROM Product JOIN Store ON Product.storeID=Store.storeID 
             WHERE Store.name=?`,
            [
                store,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
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
                return callBack(null, results);
            }
        );
    },
};
