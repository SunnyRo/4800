// Add server info
require('dotenv/config');
const userRouter = require("./src/api/user/user.router");
const storeRouter = require("./src/api/store/store.router");
const searchRouter = require("./src/api/search/search.router");
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')
const checkoutRouter = require('./src/api/checkout/checkout.router');
// Serve static files from the React frontend app
const server = express();
server.use(cookieParser());
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies;
server.use("/", cors(), userRouter);
server.use("/home", cors(), storeRouter);
server.use("/search", cors(), searchRouter);
server.use("/order", cors(), checkoutRouter);

server.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}!`),
);
