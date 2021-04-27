const { updateImage, removeAddress, updatePassword, updateEmail, updateName, updatePhone, createUser, updateToken, removeToken, getUserByUserEmail, getUserInfo, getUserAddresses, addAddress } = require("./user.service");
const { createAccessToken, createRefreshToken, sendAcessToken, sendTokens } = require("../../auth/token");
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

module.exports = {
    signup: (req, res) => {
        console.log("Controller signup")
        const body = req.body
        // check if email is already existed in the database
        getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log('errorSQL: getUserByuserEmail\n', err);
            }
            const user = results;
            if (user) {
                console.log("Email already existed");
                return res.send({ error: "Email already existed" })
            }
            // Email is new then create hashpasss store all info into database
            const hashedPassword = await hash(body.password, 10);
            body.password = hashedPassword;
            createUser(body, (err, results) => {
                if (err) {
                    console.log('errorSQL:\n', err);
                }
                return res.send({ message: "Account successfully created! You can now log in at the sign in page." });
            });
        })
    },
    login: (req, res) => {
        console.log("Controller login")
        const body = req.body;
        // check if User is existed in the database
        getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log('errorSQL: getUserByUserEmail\n', err);
            }
            const user = results;
            if (!user) {
                console.log("User does not exist");
                return res.send({ error: "User does not exist" });
            }
            // check if password is correct
            const valid = await compare(body.password, user.password);
            if (!valid) {
                console.log("incorrect password");
                return res.send({ error: "incorrect password" });
            }
            // create refresh and accesstoken (using email and secret to generate token)
            const accesstoken = createAccessToken(user.email);
            const refreshtoken = createRefreshToken(user.email);
            // store the refresh token to the req body and update in the database
            user.refreshToken = refreshtoken;
            updateToken(user, async (err, results) => {
                if (err) {
                    console.log("errorSQL", err);
                }
            });
            // send accesstoken to the request and refreshtoken to cookie
            sendTokens(res, req, user.image, user.customerID, user.firstName, user.number, user.street, user.city, user.zipcode, refreshtoken, accesstoken);
        })
    },
    logout: (req, res) => {
        console.log("Controller logout")
        const userEmail = req.body.email;
        // remove refreshtoken in the database
        removeToken(userEmail, async (err, results) => {
            if (err) {
                console.log('errorSQL: removeToken\n', err)
            }
            console.log("Removed refreshtoken in the database");
        });
        // remove cookie refreshtoken
        res.clearCookie('refreshtoken', { path: '/refresh_token' });
        return res.send({ message: 'Logged out' });
    },
    getProfile: (req, res) => {
        console.log("Controller getProfile")
        const userEmail = req.userEmail;
        let info = {}
        let addresses = {}
        getUserInfo(userEmail, async (err, info) => {
            if (err) {
                console.log('errorSQL: getUserInfo\n', err)
            }
            getUserAddresses(userEmail, async (err, addresses) => {
                if (err) {
                    console.log('errorSQL: getUserAddresses\n', err)
                }
                return res.send({
                    info: info,
                    addresses: addresses,
                })
            });
        });
    },
    updateUserPassword: (req, res) => {
        console.log("Controller updateUserPassword")
        getUserByUserEmail(req.body.email, async (err, results) => {
            if (err) {
                console.log('errorSQL: getUserByUserEmail\n', err)
            }
            const user = results;
            if (user) {
                const body = req.body;
                const hashedPassword = await hash(body.password, 10);
                body.password = hashedPassword;
                updatePassword(body, async (err, results) => {
                    if (err) {
                        console.log('errorSQL: updatePassword\n', err)
                    }
                    return res.send({ message: "Password changed successfully" });
                })
            }
        })
    },
    updateUserPhone: (req, res) => {
        console.log("Controller updateUserPhone")
        const body = req.body;
        updatePhone(body, async (err, results) => {
            if (err) {
                console.log('errorSQL: updateUserPhone\n', err)
            }
            // return res.send(results);
            return res.send({ message: "updated phone" });
        })

    },
    updateUserImage: (req, res) => {
        console.log("Controller updateUserImage")
        if (req.files === null) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const file = req.files.file;
        const check = "./client/public/uploads/" + file.name
        const name = 'customerID' + '_' + req.body.customerID + '_' + file.name
        const fs = require('fs');
        const glob = require('glob');
        glob("./client/public/uploads/" + 'customerID' + '_' + req.body.customerID + '_' + '*', function (er, files) {
            files.map((name) => {
                fs.unlink(name, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        })

        fs.promises.access(check)
            .then(() => {
                return res.send({ fileName: name, filePath: `/uploads/${name}` });
            })
            .catch(() => {
                file.mv(`./client/public/uploads/${file.name}`, err => {
                    if (err) {
                        console.error(err);
                    }
                    fs.rename('./client/public/uploads/' + file.name, './client/public/uploads/' + name, () => {
                        console.log("renamed file")
                    })
                    let data = {}
                    data['customerID'] = req.body.customerID;
                    data['image'] = name
                    updateImage(data, async (err, results) => {
                        if (err) {
                            console.log('errorSQL: updateImage\n', err)
                        }
                        return res.send({ fileName: name, filePath: `/uploads/${name}` });
                    })
                });
            });
    },
    updateUserName: (req, res) => {
        console.log("Controller updateUserName")
        const body = req.body;
        updateName(body, async (err, results) => {
            if (err) {
                console.log('errorSQL: updateUserName\n', err)
            }
            return res.send({ message: "updated name" });
        })

    },
    updateUserEmail: (req, res) => {
        console.log("Controller updateUserEmail")
        const body = req.body;
        getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log('errorSQL: updateUserName\n', err)
            }
            const user = results;
            if (user) {
                console.log("Email already existed");
                return res.send({ message: "Email already existed" })
            }
            updateEmail(body, async (err, results) => {
                if (err) {
                    console.log('errorSQL: updateEmail\n', err)
                }
                return res.send({ message: "updated email" });
            })
        })

    },
    addUserAddress: (req, res) => {
        console.log("Controller addUserAddress")
        const body = req.body;
        addAddress(body, async (err, results) => {
            if (err) {
                console.log('errorSQL: addAddress\n', err)
            }
            return res.send(results);
        })

    },
    removeUserAddress: (req, res) => {
        console.log("Controller removeUserAddress")
        const body = req.body;
        removeAddress(body, async (err, results) => {
            if (err) {
                console.log('errorSQL: removeAddress\n', err)
            }
            return res.send({ message: "removed an address" });
        })

    },
    refresh_token: async (req, res) => {
        console.log("Controller refresh_token")
        const token = req.cookies.refreshtoken;
        if (!token) {
            console.log("cookies not found on /refresh_token");
        }
        // check if refreshtoken is valid
        if (!token.includes(req.body.refreshtoken)) return res.sendStatus(403)
        let payload = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.send({ accesstoken: '' })
        }
        getUserByUserEmail(payload.userEmail, (err, results) => {
            if (err) {
                console.log(err);
                return res.send({ message: "error" });
            }
            const user = results;
            if (!user) {
                console.log("cannot find user email in database")
                return res.send({ accesstoken: '' });
            }
            // get the token from the database
            const tokenDatabse = user.refreshToken;
            if (!tokenDatabse) {
                return res.send({ accesstoken: '' });
            }
            if (token !== tokenDatabse) {
                return res.send({ accesstoken: '' });
            }
            console.log('everything is correct then send new accesstoken')
            // create accesstoken (using email and secret to generate token)
            const accesstoken = createAccessToken(user.email);
            // send accesstoken to the request 
            sendAcessToken(res, req, accesstoken);
        })
    }

};
