const pool = require("../../config/database");
module.exports = {
    getOrders: (data, callBack) => {
        pool.query(
            `SELECT * FROM Orders`,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateOrder: (data, callBack) => {
        pool.query(
            `UPDATE Orders SET orderStatus=? WHERE orderID=?`,
            [
                data.status,
                data.orderID,
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
