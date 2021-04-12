const pool = require("../../config/database");
const { createOrderAndPayment, updateProductQuantities, createOrderItems } = require("./checkout.service");
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
            return res.send({ messsage: 'Order Created' });
        });
        const orderItemsData = data.orderItem;
        setTimeout(() => {  
            for (index = 0; index < orderItemsData.length; index++) {
                createOrderItems(orderItemsData[index], (err, results) => {
                    if (err) {
                        console.log(err);
                        res.send({ err });
                    }
                    //return res.send({ messsage: 'OrderItems Created.' });
                });
                updateProductQuantities(orderItemsData[index], (err, results) => {
                    if (err) {
                        console.log(err);
                        res.send({ err });
                    }
                    //return res.send({ messsage: 'Product quantities updated.' });
                });
            }
        }, 2000); //there is a delay in order to allow database to update prior to these calls
    }
};
