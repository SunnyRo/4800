const { createOrderAndPayment, updateProductQuantities, createOrderItems, getOrders, getOrderDetail } = require("./order.service");
module.exports = {
    completeOrder: (req, res) => {
        console.log(req.body);
        const data = req.body;
        const orderData = data.Order;
        createOrderAndPayment(orderData, (err, results) => {
            if (err) {
                console.log(err);
                res.send({ err });
            }
        });
        const orderItemsData = data.orderItem;
        setTimeout(() => {
            for (index = 0; index < orderItemsData.length; index++) {
                console.log(index)
                console.log(orderItemsData[index])
                createOrderItems(orderItemsData[index], (err, results) => {
                    if (err) {
                        console.log(err);
                        res.send({ err });
                    }
                });
                updateProductQuantities(orderItemsData[index], (err, results) => {
                    if (err) {
                        console.log(err);
                        res.send({ err });
                    }
                    return res.send({ message: "Order Successfully Placed" })
                });
            }
        }, 2000); //there is a delay in order to allow database to update prior to these calls
    },
    getUserOrders: (req, res) => {
        const body = req.body;
        getOrders(body, async (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })

    },
    getUserOrderDetail: (req, res) => {
        const body = req.body;
        getOrderDetail(body, async (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })

    },

};
