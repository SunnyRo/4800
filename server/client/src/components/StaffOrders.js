import React, { Component } from "react";
import "./css/ProductReviews.css";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import Footer from "./Footer";

class StaffOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stafforders: null
        };
    }

    componentWillMount() {
        const stafforders = JSON.parse(localStorage.getItem("stafforders"));
        this.setState({
            stafforders: stafforders
        })
    }

    render() {
        const { stafforders } = this.state
        return (
            <div className="product_orders">
                <Header />
                <div className="heading_container">
                    <div className="main_heading">
                        {"Staff Only"}
                    </div>
                </div>
                <div className="read_orders">
                    All orders from customers
                </div>
                <div className="ratings_list_container">
                    {stafforders.map((order) => (
                        <li className="ratings_list" key={order.id}>
                            <div className="order_container">
                                <div className="order_name">
                                    Name: {order.firstName}
                                </div>
                            </div>
                            <div className="rating_title_container">
                                <div className="order_title">
                                    Email: {order.email}
                                </div>
                            </div>
                            <div className="rating_title_container">
                                <div className="order_date">
                                    Order#: {order.orderID}
                                </div>
                            </div>
                            <div className="rating_title_container">
                                <div className="order_body">
                                    Status: {order.orderStatus}
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}

export default StaffOrders;
