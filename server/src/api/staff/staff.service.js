const pool = require("../../config/database");
const nodemailer = require('nodemailer')
const { google } = require('googleapis');
module.exports = {
    getOrders: (data, callBack) => {
        pool.query(
            `SELECT orderID,orderStatus,firstName,email FROM Orders JOIN Customer ON Orders.customerID=Customer.customerID`,
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
    sendEmail: async (email, orderID, status) => {
        const oAuth2Client = new google.auth.OAuth2(
            process.env.MAIL_ID,
            process.env.MAIL_SECRET,
            process.env.MAIL_URI,
        );
        oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });
        try {
            const accessToken = await oAuth2Client.getAccessToken();
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'growceries21@gmail.com',
                    clientId: process.env.MAIL_ID,
                    clientSecret: process.env.MAIL_SECRET,
                    refreshToken: process.env.MAIL_REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });

            const mailOptions = {
                from: 'groceries21@gmail.com',
                to: email,
                subject: 'Your Order #' + orderID + ' Status',
                text: 'Hello, Your Order is ' + 'status',
                html: 'Message from: growceries.com' + '<br></br> Email: ' + email + '<br></br> Message: ' + 'your order is ' + status,
            };
            const result = await transport.sendMail(mailOptions);
            console.log("sended mail", result)
        } catch (error) {
            console.log(error)
        }
    },
};
