const pool = require("../../config/database");
module.exports = {
    getReviews: (data, callBack) => {
        pool.query(
            `SELECT firstName,lastName,image,Product.numberofreviews,Product.rating as averageRating, Product.photo,Product.name as productname, Store.name as storename,title,body,Review.rating,Review.datetime as datetime FROM Review JOIN OrderItem ON Review.orderitemID=OrderItem.orderitemID JOIN Product ON OrderItem.productID=Product.productID JOIN Store ON Product.storeID=Store.storeID JOIN Orders ON OrderItem.orderID=Orders.orderID JOIN Customer ON Orders.customerID=Customer.customerID where OrderItem.productID=?`,
            [data.productID],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRatings: (data, callBack) => {
        pool.query(
            `SELECT rating FROM Review JOIN OrderItem ON Review.orderitemID=OrderItem.orderitemID where OrderItem.productID=?`,
            [data.productID],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateRating: (data, callBack) => {
        pool.query(
            `update Product set rating=?,numberofreviews=? where productID=?`,
            [
                data.rating,
                data.numberofreviews,
                data.productID,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    addReview: (data, callBack) => {
        pool.query(
            `SET @orderitemID = ((SELECT orderitemID FROM OrderItem JOIN Orders ON OrderItem.orderID=Orders.orderID JOIN Product ON OrderItem.productID=Product.productID where Orders.customerID=? and OrderItem.productID=? ORDER BY Orders.orderDateTime DESC LIMIT 1));
             INSERT into Review(orderitemID, title, body, rating, datetime) VALUES(@orderitemID,?,?,?,?);`,
            [
                data.customerID,
                data.productID,
                data.title,
                data.body,
                data.rating,
                data.datetime,
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
