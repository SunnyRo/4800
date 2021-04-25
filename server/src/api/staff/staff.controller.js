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
        status = '';
        if (body.status == 1) {
            status = 'Ready'
        } else if (body.status == 2) {
            status = 'Shipping'
        } else {
            status = 'Delivered'
        }
        sendEmail(body.email, body.orderID, status)
        updateOrder(body, (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })
    }
};
