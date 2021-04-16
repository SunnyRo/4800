import React, { Component } from "react";
import "./css/OrderDetails.css";
import Header from "./Header";
import Footer from "./Footer";
import {
    createMuiTheme,
    ThemeProvider,
    Button,
    TextField,
} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#06C167",
        },
        secondary: {
            main: "#06C167",
        },
    },
});

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.backToOrderHistory = this.backToOrderHistory.bind(this);
        this.buyAgain = this.buyAgain.bind(this);
    }

    backToOrderHistory(event) {
        this.props.history.push("/orderhistory");
    }

    buyAgain = (product) => {
        console.log("Buy again");
        let cart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : {};
        let id = product.productID.toString();
        if (cart[id]) {
            cart[id] = cart[id];
        } else {
            cart[id] = 0;

            let cartInfo = localStorage.getItem("cartInfo")
                ? JSON.parse(localStorage.getItem("cartInfo"))
                : [];
            let item = {
                id: id,
                name: product.productname,
                price: product.unitPrice,
                type: product.type,
                photo: product.productphoto,
                address: product.address,
                phone: product.phone,
                store: product.storename,
            };
            cartInfo.push(item);
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.forceUpdate();
    };

    render() {
        const order_details = JSON.parse(localStorage.getItem("orderDetails"));

        return (
            <div className="order_details">
                <ThemeProvider theme={theme}>
                    <Header />
                    <div className="order_details_main_heading">
                        Order ID: {order_details[0].orderID}
                    </div>
                    <div className="order_details_box">
                        <div className="order_details_heading">
                            Order Details:
                        </div>
                        <div className="order_date">
                            {"Order placed: "}
                            {order_details[0].orderDateTime.slice(0, 10)}
                        </div>
                        <div className="order_amount">
                            {"Order Amount: $"}
                            {order_details[0].amount}
                        </div>
                        <div className="payment_method">
                            {"Payment method: Card ending in "}
                            {order_details[0].CCnumber.toString().slice(
                                11 - 15
                            )}
                        </div>
                    </div>
                    <div className="order_product_list">
                        {order_details.map((product) => (
                            <li className="product_list" key={product.orderID}>
                                <div className="product_container">
                                    <img
                                        className="product_photo"
                                        src={product.photo}
                                    />
                                    <div className="product_name">
                                        {product.productname}
                                    </div>
                                    <div className="product_price">
                                        {"$"}
                                        {product.unitPrice.toFixed(2)}
                                    </div>
                                    <div className="product_quantity">
                                        {"Quantity: "}
                                        {product.quantity}
                                    </div>
                                    <div className="product_type">
                                        {"Type: "}
                                        {product.type}
                                    </div>
                                    <div className="product_store">
                                        {product.storename}
                                    </div>
                                    <div className="store_address">
                                        {product.address}
                                    </div>
                                    <div className="store_phone">
                                        {product.phone}
                                    </div>
                                    <div className="buy_again">
                                        Enjoyed this product?
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        // TODO ONCLICK
                                        onClick={() => this.buyAgain(product)}
                                    >
                                        Buy again here
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </div>
                    <Button
                        className="back_to_order_history_button"
                        variant="contained"
                        color="primary"
                        onClick={this.backToOrderHistory}
                    >
                        Back to Order History
                    </Button>
                    <Footer />
                </ThemeProvider>
            </div>
        );
    }
}

export default OrderDetails;
