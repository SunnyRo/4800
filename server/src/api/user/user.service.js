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
                    console.log("error in customer table")
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
    getUserInfo: (email, callBack) => {
        console.log("getting info",email)
        pool.query(
            `select customerID,firstName,lastName,phone,email from Customer
             where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserAddresses: (email, callBack) => {
        console.log("getting addresses",email)
        pool.query(
            `select addressID,number,street,city,zipcode,Customer.customerID,isUse from Customer JOIN Address ON Customer.customerID=Address.customerID 
             where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserCards: (email, callBack) => {
        console.log("getting cards",email)
        pool.query(
            `select CCnumber,fullName,expirationDate,validationCode,isUse from Customer JOIN CreditCard ON Customer.customerID=CreditCard.customerID 
            where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
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
    },
    addAddress: (data, callBack) => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log(data)
        pool.query(
             `insert into Address(number,street,city,zipcode,customerID) VALUES(?,?,?,?,?);`,
            [
                data.number,
                data.street,
                data.city,
                data.zipcode,
                data.customerID,
            ],
            (error, results, fields) => {
                if (error) {
                    console.log("error in address table")
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    addCard: (data, callBack) => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log(data)
        pool.query(
             `insert into CreditCard(CCnumber,customerID,fullName,expirationDate,validationCode) VALUES(?,?,?,?,?);`,
            [
                data.ccNumber,
                data.customerID,
                data.fullName,
                data.expirationDate,
                data.validationCode,
            ],
            (error, results, fields) => {
                if (error) {
                    console.log("error in CreditCard table")
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
};
