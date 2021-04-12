import { React, Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Street from "./TextBox";
import City from "./TextBox";
import Zip from "./TextBox";
import {
    TextField,
} from "@material-ui/core";

import {
    Button,
    createMuiTheme,
    Divider,
    ThemeProvider,
} from "@material-ui/core";
import "./css/Checkout.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#06C167",
        },
        secondary: {
            main: "#06C167",
        },
        background: {
            main: "#06C167",
        },
    },
});

const convertDistance = (distance) => {
    const floatDistance = parseFloat(distance);
    const result = (floatDistance * 0.621371).toFixed(2);
    return result;
};

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: {},
            total: 0,
            storeDistances: {},
        };
        this.backtoCart = this.backtoCart.bind(this);
    }

    backtoCart(event) {
        this.props.history.push("/cart");
    }

    render() {
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        /*const profile = JSON.parse(localStorage.getItem("profile"));*/

        return (
            <div className="checkout">
                <ThemeProvider theme={theme}>
                    <Header />
                    <div className="flex_container">
                        <div className="products_container">
                            {cartInfo.map((product) => (
                                <div className="product_layout">
                                    <div className="product_details_flexbox1">
                                        <img
                                            className="product_image"
                                            src={product.photo}
                                        ></img>
                                        <div className="product_details_name_type">
                                            <div className="product_name">
                                                {product.name}
                                            </div>
                                            <div className="product_type">
                                                Type: {product.type}
                                            </div>
                                        </div>
                                        <div className="product_details_quantity">
                                            <div className="product_quantity">
                                                Quantity: {cart[product.id]}
                                            </div>
                                        </div>
                                        <div className="product_details_price">
                                            <div className="product_price">
                                                $
                                                {parseFloat(
                                                    product.price
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="store_and_delivery">
                                        <div className="store_details">
                                            <div className="store_name">
                                                {product.store}
                                            </div>
                                            <div className="store_address">
                                                {product.address}
                                            </div>
                                            <div className="store_phone">
                                                {product.phone}
                                            </div>
                                            <div className="store_distance">
                                                {convertDistance(
                                                    storeDistances[
                                                        product.store
                                                    ]
                                                )}
                                                {" miles away"}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="remove_button"
                                        color="primary"
                                        productID={product.id}
                                        onClick={this.removeFromCart}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="checkout_details">
                            <div className="order_summary">Order Summary:</div>
                            <div className="subtotal">{"Subtotal: "}</div>
                            <div className="delivery_fees">
                                {"Delivery fees: "}
                            </div>
                            <div className="tax_fee">{"Tax fees: "}</div>
                            <div className="order_total">{"Order total: "}</div>
                        </div>
                    </div>
                    <div className="address">
                        <div className="street">
                            <TextField
                                variant="standard"
                                type="street"
                                name="street"
                                label="Street"
                                color="primary"
                            ></TextField>
                        </div>
                        <div className="city">
                            <TextField
                                variant="standard"
                                type="city"
                                name="city"
                                label="City"
                                color="primary"
                            ></TextField>
                        </div>
                        <div className="zip">
                            <TextField
                                variant="standard"
                                type="zip"
                                name="zip"
                                label="Zip"
                                color="primary"
                            ></TextField>
                        </div>
                    </div>
                    <Button
                        className="return_to_cart"
                        variant="contained"
                        color="primary"
                        onClick={this.backtoCart}
                    >
                        Return to cart
                    </Button>

                    {/*<div>*/}
                        {/*display profile address as default
                        and double click to edit*/}
                        {/*<Street />*/}
                        {/*<City />*/}
                        {/*<Zip />*/}
                   {/* </div>*/}
                    

                    <Footer />
                </ThemeProvider>
            </div>
        );
    }
}

export default Checkout;
