const pool = require("../../config/database");
module.exports = {
    createOrderAndPayment: (data, callBack) => {
        //data.addressID is not used at the moment
        pool.query(
            `insert into \`Orders\`(customerID,orderDateTime,orderStatus,addressID) VALUES(?,?,?,?);
                insert into Payment(orderID, amount, CCnumber) VALUES(LAST_INSERT_ID(),?,?);`,
            [
                data.customerID,
                data.datetime,
                1, //a value for an orderStatus
                data.addressID,
                data.paymentamount,
                data.ccnumber,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0].insertId);
            }
        );
    },
    createOrderItems: (data, callBack) => {
        pool.query(
            `SET @ID = ((SELECT orderID FROM \`Orders\` ORDER BY orderID DESC LIMIT 1));
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
    },
    getOrders: (data, callBack) => {
        pool.query(
            `SELECT customerID,Orders.orderID,orderDateTime,OrderStatus.status,addressID,paymentID,amount,CCnumber FROM Orders JOIN OrderStatus ON Orders.orderStatus=OrderStatus.orderstatusID JOIN Payment ON Payment.orderID=Orders.orderID where Orders.customerID=? ORDER BY orderDateTime DESC`,
            // `SELECT * FROM Orders where Orders.CustomerID=?`,
            [data.customerID],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getOrderDetail: (data, callBack) => {
        pool.query(
            `SELECT Product.productID, Product.photo,OrderItem.quantity,OrderItem.unitPrice,customerID,Orders.orderID,orderDateTime,OrderStatus.status,addressID,amount,CCnumber,Product.name AS productname,type, Store.name AS storename, address,phone FROM Orders JOIN OrderStatus ON Orders.orderStatus=OrderStatus.orderstatusID JOIN Payment ON Payment.orderID=Orders.orderID JOIN OrderItem ON Orders.orderID=OrderItem.orderID JOIN Product ON Product.productID=OrderItem.productID JOIN Store ON Product.storeID=Store.storeID where Orders.orderID=?`,
            // `SELECT * FROM Orders where Orders.CustomerID=?`,
            [data.orderID],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};
