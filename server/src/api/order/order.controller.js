const { createOrderAndPayment, updateProductQuantities, createOrderItems, getOrders, getOrderDetail } = require("./order.service");
module.exports = {
    completeOrder: (req, res) => {
        console.log("Controller completeOrder")
        const data = req.body;
        const orderData = data.Order;
        let orderID = null;
        createOrderAndPayment(orderData, (err, results) => {
            if (err) {
                console.log('errorSQL: createOrderAndPayment\n', err);
            }
            orderID = results
            res.send({ message: "Order successfully placed and your order #" + orderID })
        });
        const orderItemsData = data.orderItem;
        setTimeout(() => {
            for (index = 0; index < orderItemsData.length; index++) {
                createOrderItems(orderItemsData[index], (err, results) => {
                    if (err) {
                        console.log('errorSQL: createOrderItems\n', err);
                    }
                });
                updateProductQuantities(orderItemsData[index], (err, results) => {
                    if (err) {
                        console.log('errorSQL: updateProductQuantities\n', err);
                    }
                });
            }
        }, 2000); //there is a delay in order to allow database to update prior to these calls
        // return res.send({ message: "Order Successfully Placed and your order #" + orderID.toString() })
        console.log("done update orderedItem")
    },
    getUserOrders: (req, res) => {
        console.log("Controller getUserOrders")
        const body = req.body;
        getOrders(body, async (err, results) => {
            if (err) {
                console.log('errorSQL: getOrders\n', err);
            }
            return res.send(results);
        })

    },
    getUserOrderDetail: (req, res) => {
        console.log("Controller getUserOrderDetail")
        const body = req.body;
        getOrderDetail(body, async (err, results) => {
            if (err) {
                console.log('errorSQL: getOrderDetail\n', err);
            }
            return res.send(results);
        })

    },

};
