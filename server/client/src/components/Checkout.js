import { React, Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import {
    Button,
    createMuiTheme,
    ThemeProvider,
    TextField,
} from "@material-ui/core";
import "./css/Checkout.css";
import AmEx from "./images/AmEx.png";
import Visa from "./images/Visa.png";
import Mastercard from "./images/mastercard.png";
import Discover from "./images/Discover.png";
import CheckoutItem from "./CheckoutItem";
import AuthenticationService from "./Authentication";

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
            addressID: null,
            cart: {},
            total: 0,
            storeDistances: {},
            quantity: "",
            cardNumber: "",
            first_number: "",
            img_src: null,
            card_company: "",
            testNumber: "12",
            num_of_items: 0,
            subtotal: 0.0,
            delivery_fees: 0.0,
            cart: [],
            cartInfo: {},
            profile: {},
        };
        this.backtoCart = this.backtoCart.bind(this);
        this.change_card_info = this.change_card_info.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.calc_num_of_items = this.calc_num_of_items.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.calc_subtotal = this.calc_subtotal.bind(this);
        this.calc_delivery_fees = this.calc_delivery_fees.bind(this);
    }
    removeFromCart = (product) => {
        const productID = product.id;
        console.log(productID);
        let cart = JSON.parse(localStorage.getItem("cart"));
        let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const filteredItems = cartInfo.filter((item) => item.id !== productID);
        delete cart[productID];
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartInfo", JSON.stringify(filteredItems));
        this.setState({
            cart: cart,
            cartInfo: filteredItems,
        });
        this.calc_num_of_items();
        this.calc_subtotal();
        this.calc_delivery_fees();
    };

    backtoCart(event) {
        this.props.history.push("/cart");
    }

    handleInputChange = (event) =>
        this.setState({ [event.target.name]: event.target.value });

    change_card_info = () => {
        if (this.state.cardNumber.charAt(0) === "3") {
            this.setState({
                img_src: { AmEx },
                card_company: "American Express",
            });
        }
        if (this.state.cardNumber.charAt(0) === "4") {
            this.setState({
                img_src: { Visa },
                card_company: "Visa",
            });
        }
        if (this.state.cardNumber.charAt(0) === "5") {
            this.setState({
                img_src: { Mastercard },
                card_company: "Mastercard",
            });
        }
        if (this.state.cardNumber.charAt(0) === "6") {
            this.setState({
                img_src: { Discover },
                card_company: "Discover",
            });
        }
    };

    updateCart = (product, quantity) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const productID = product.id;
        console.log(cart[productID]);
        cart[productID] = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({
            cart: cart,
        });
    };

    calc_num_of_items = () => {
        var num = 0;
        const cart_info = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart_info.forEach((product, i) => {
            num = num + parseInt(cart[product.id]);
        });
        this.setState({
            num_of_items: num,
        });
    };

    calc_subtotal = () => {
        var num = 0.0;
        const cart_info = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart_info.forEach((product, i) => {
            num = num + parseFloat(cart_info[i].price * cart[product.id]);
        });
        this.setState({
            subtotal: num,
        });
    };

    calc_delivery_fees = () => {
        console.log("CALC_DELIVERY_FEES TEST");
        var num = 0.0;
        let store_names = [];
        const cart_info = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        cart_info.forEach((product) => {
            if (!store_names.includes(product.store))
                store_names.push(product.store);
        });
        // storeDistances.forEach((store, i) => {
        // })
        store_names.forEach((store, i) => {
            num = num + parseFloat(storeDistances[store]) * 0.621371;
        })
        num = num * 0.10;
        this.setState({
            delivery_fees: num,
        })
    };

    convertDistance = (distance) => {
        const floatDistance = parseFloat(distance);
        const result = (floatDistance * 0.621371).toFixed(2);
        return result;
    };

    updateCart = (product, quantity) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const productID = product.id;
        console.log(cart[productID]);
        cart[productID] = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({
            cart: cart,
        });
    };
    placeOrder = () => {
        console.log("placeOrder button")
        console.log(this.state.addressID)
    }

    componentWillMount() {
        this.change_card_info();
        this.calc_num_of_items();
        this.calc_subtotal();
        this.calc_delivery_fees();
        // console.log(this.state.cardNumber.charAt(0));
        // this.change_card_info();
        // console.log("componentWillMount");
        // console.log(this.state.card_company);
        // console.log(this.state.card_image);
    }

    // Place your order: print addressID, CC number, cart items from cart array, order total

    render() {
        const { img_src, card_company } = this.state;
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        const profile = JSON.parse(localStorage.getItem("profile"));

        return (
            <div className="checkout">
                <ThemeProvider theme={theme}>
                    <Header />
                    <div className="checkout_header">
                        {"Checkout"}{" "}
                        {"(" + Object.keys(cart).length + " Items)"}
                    </div>
                    <div className="shipping_address_and_checkout_details_flex_container">
                        <div className="shipping_address_container">
                            <div className="shipping_address_flexbox_1">
                                <div className="shipping_heading">
                                    Shipping Address
                                </div>
                                <div className="name">
                                    {profile.info[0].firstName}{" "}
                                    {profile.info[0].lastName}
                                </div>

                                {/* <Button
                                    className="change_button"
                                    color="primary"
                                >
                                    Change
                                </Button> */}
                            </div>
                            <div className="address_text">
                                <form className="shipping_address_form">
                                    {profile.addresses.map((address) => (
                                        <li
                                            className="address_list"
                                            key={address.id}
                                        >
                                            <div className="address_radio_button">
                                                <input
                                                    className="shipping_address_input"
                                                    type="radio"
                                                    value={address.addressID}
                                                    id="shipping_address"
                                                    name="addressID"
                                                    onChange={this.handleInputChange}
                                                />
                                                <label
                                                    className="shipping_address_label"
                                                    for="shipping_address"
                                                >
                                                    {address.number}{" "}
                                                    {address.street}
                                                    {", "}
                                                    {address.city}
                                                    {", "}
                                                    {address.zipcode}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </form>
                            </div>
                        </div>
                        <div className="checkout_details_container">
                            <div className="order_summary">Order Summary:</div>
                            <div className="num_of_items_box">
                                <div className="num_of_items">
                                    {"Number of items: "}
                                </div>
                                <div className="num_of_items_num">
                                    {this.state.num_of_items}
                                </div>
                            </div>
                            <div className="subtotal_box">
                                <div className="subtotal">{"Subtotal: "}</div>
                                <div className="subtotal_num">
                                    {"$"}
                                    {this.state.subtotal.toFixed(2)}
                                </div>
                            </div>
                            <div className="delivery_fees_box">
                                <div className="delivery_fees">
                                    {"Delivery fees: "}
                                </div>
                                <div className="delivery_fees_num">
                                    {"$"}{this.state.delivery_fees.toFixed(2)}
                                </div>
                            </div>
                            <div className="tax_fees_box">
                                <div className="tax_fees">
                                    {"Tax fees: (7.25%)"}
                                </div>
                                <div className="tax_fees_num">
                                    {"$"}{" "}
                                    {(this.state.subtotal * 0.0725).toFixed(2)}
                                </div>
                            </div>
                            <div className="order_total_box">
                                <div className="order_total">
                                    {"Order total: "}
                                </div>
                                <div className="order_total_num">
                                    {"$"}
                                    {(
                                        this.state.subtotal * 1.0725 +
                                        this.state.delivery_fees
                                    ).toFixed(2)}
                                </div>
                            </div>
                            <Button
                                className="place_your_order"
                                variant="contained"
                                color="primary"
                                onClick={this.placeOrder}
                            // Event TODO onClick
                            >
                                Place your order
                            </Button>
                        </div>
                    </div>
                    <div className="payment_info_flex_container">
                        <div className="payment_info_container">
                            <div className="payment_info_body_flexbox">
                                <div className="payment_header">
                                    Payment Method
                                </div>
                                {/* TODO */}
                                <img className="card_logo" src={img_src} />
                                <div className="cc_info_text">
                                </div>
                                {/* <Button
                                    className="change_button"
                                    color="primary"
                                >
                                    Change
                                </Button> */}
                            </div>
                        </div>
                    </div>
                    <div className="review_items_subheading">Review items</div>
                    <div className="products_flex_container">
                        <div className="products_container">
                            {cartInfo.map((product) => (
                                <CheckoutItem
                                    product={product}
                                    cart={cart}
                                    convert={this.convertDistance}
                                    update={this.updateCart}
                                    storeDistances={storeDistances}
                                    update_num_of_items={this.calc_num_of_items}
                                    update_subtotal={this.calc_subtotal}
                                    remove={this.removeFromCart}
                                />
                            ))}
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
                    <Footer />
                </ThemeProvider>
            </div>
        );
    }
}

export default Checkout;
