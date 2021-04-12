const pool = require("../../config/database");
module.exports = {
    createOrderAndPayment: (data, callBack) => {
        console.log(data);
        //data.addressID is not used at the moment
        pool.query(
            `insert into \`Order\`(customerID,orderDateTime,orderStatus) VALUES(?,?,?);
                insert into Payment(orderID, amount, CCnumber) VALUES(LAST_INSERT_ID(),?,?);`,
            [
                data.customerID, 
                data.datetime,
                1, //a value for an orderStatus
                data.payment_amount,
                data.ccnumber,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createOrderItems: (data, callBack) => {
        console.log(data);
        pool.query(
            `SET @ID = ((SELECT orderID FROM \`Order\` ORDER BY orderID DESC LIMIT 1));
                SET @Price = (SELECT unitPrice FROM Product WHERE productID=?);
                INSERT into OrderItem(productID, quantity, unitPrice, orderID) VALUES(?,?,@Price,@ID);`,
            [
                data.productID,
                data.productID,
                data.quantity
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProductQuantities: (data, callBack) => {
        console.log(data);
        pool.query(
            `UPDATE Product SET quantity=(quantity-?) WHERE productID=?`,
            [
                data.quantity,
                data.productID
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
        