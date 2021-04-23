const { sendEmail, getOrders, updateOrder } = require("./staff.service")
module.exports = {
    getAllOrders: (req, res) => {
        const body = req.body
        getOrders(body, async (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })
    },
    updateAnOrder: (req, res) => {
        const body = req.body
        const connection = require('./../socket/socket').connection();
        let status = '';
        // if (body.status == 1) {
        //     status = 'Order #' + body.orderID + ': Ready'
        // } else if (body.status == 2) {
        //     status = 'Order #' + body.orderID + ': Shipping'
        // } else {
        //     status = 'Order #' + body.orderID + ': Delivered'
        // }
        if (body.status == 1) {
            status = 'Ready'
        } else if (body.status == 2) {
            status = 'Shipping'
        } else {
            status = 'Delivered'
        }
        // connection.sendEvent('order', status)
        sendEmail(body.email, body.orderID, status)
        updateOrder(body, (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })
    }
};
