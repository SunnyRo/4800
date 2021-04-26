import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/OrderHistory.css";
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

class PreviousOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_history: [],
            orderID: "",
        };

        this.toProfile = this.toProfile.bind(this);
        this.getOrderDetails = this.getOrderDetails.bind(this);
    }

    getOrderDetails = (event) => {
        const orderID = event.currentTarget.dataset.buttonKey;
        console.log("Run getOrderDetails");
        const user = AuthenticationService.getCurrentUser();
        // const currentUser = JSON.parse(localStorage.getItem("user"));
        // const orderID = orderID;
        fetch("/order/detail", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                orderID: orderID,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    localStorage.setItem("orderDetails", JSON.stringify(json));
                    this.props.history.push("/orderdetails");
                }
            });
    };

    toProfile = () => {
        const user = AuthenticationService.getCurrentUser();
        const currentUser = JSON.parse(localStorage.getItem("user"));

        fetch("/profile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                userEmail: currentUser.email,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    localStorage.setItem("profile", JSON.stringify(json));
                }
            });
    };

    componentWillMount() {
        this.toProfile();
        const order_history = JSON.parse(localStorage.getItem("order_history"));
        this.setState({
            order_history: order_history,
        });
    }

    render() {
        const order_history = JSON.parse(localStorage.getItem("order_history"));
        // const { order_history } = this.state;

        return (
            <div className="previous_orders">
                <Header />
                <ThemeProvider theme={theme}>
                    <div className="main_heading">Your Order History</div>
                    <div className="order_card">
                        <div className="order_info_box">
                            {order_history.map((order, index) => (
                                <li
                                    className="order_history_list"
                                    key={order.orderID}
                                >
                                    <div className="order_info_container">
                                        <div className="order_id_container">
                                            <div className="order_id_heading">
                                                Order ID: {order.orderID}
                                            </div>
                                        </div>
                                        <div className="order_status_container">
                                            <div className="order_status_heading">
                                                Order Status
                                            </div>
                                            <div className="order_status">
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="order_date_container">
                                            <div className="order_date_heading">
                                                Order Placed
                                            </div>
                                            <div className="order_date_text">
                                                {order.orderDateTime.slice(
                                                    0,
                                                    10
                                                )}
                                            </div>
                                        </div>
                                        <div className="order_amount_container">
                                            <div className="order_amount_heading">
                                                Order Total
                                            </div>
                                            <div className="order_amount_text">
                                                ${order.amount}
                                            </div>
                                        </div>
                                        <div className="order_delivery_container">
                                            <div className="order_delivery_heading">
                                                Delivered To
                                            </div>
                                            <div className="order_delivery_text">
                                                {order.addressID}
                                            </div>
                                        </div>
                                        <div className="payment_method_container">
                                            <div className="payment_method_heading">
                                                Payment Method:
                                            </div>
                                            <div className="payment_method_text">
                                                {"Card ending in "}
                                                {order.CCnumber.toString().slice(
                                                    11 - 15
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="view_more_button"
                                        variant="contained"
                                        color="primary"
                                        name="orderID"
                                        value={order.orderID}
                                        data-button-key={order.orderID}
                                        onClick={this.getOrderDetails}
                                    >
                                        View more
                                    </Button>
                                </li>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </ThemeProvider>
            </div>
        );
    }
}

export default PreviousOrders;
