const pool = require("../../config/database");
module.exports = {
    createUser: (data, callBack) => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log(data)
        pool.query(
            `insert into Customer(firstName, lastName, phone, email, password) VALUES(?,?,?,?,?);
             insert into Address(number,street,city,zipcode,customerID) VALUES(?,?,?,?,LAST_INSERT_ID());`,
            [
                data.firstname,
                data.lastname,
                data.phone,
                data.email,
                data.password,
                data.number,
                data.street,
                data.city,
                data.zipcode,
            ],
            (error, results, fields) => {
                if (error) {
                    console.log("error in customer")
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update Customer set firstName=?, lastName=?, email=?, phone=? where email=?`,
            [
                data.firstname,
                data.lastname,
                data.email,
                data.phone,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserProfile: (email, callBack) => {
        pool.query(
            `select firstName,lastName,phone,email,number,street,city,zipcode,CCnumber,fullName,expirationDate
             from Customer JOIN Address ON Customer.customerID=Address.customerID 
             JOIN CreditCard ON Customer.customerID=CreditCard.customerID where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from Customer JOIN Address ON Address.customerID=Customer.customerID
             where email=?`,
            // `select * from Customer where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateToken: (data, callBack) => {
        pool.query(
            `update Customer set refreshToken=? where email=?`,
            [
                data.refreshToken,
                data.email,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    removeToken: (data, callBack) => {
        pool.query(
            `update Customer set refreshToken=? where email=?`,
            [
                '',
                data,
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
