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
            quantity: "",
            cardNumber: "4234123412341234",
            first_number: "",
            img_src: null,
            card_company: "",
            testNumber: "12",
        };
        this.backtoCart = this.backtoCart.bind(this);
        this.change_card_info = this.change_card_info.bind(this);
        this.testClick = this.testClick.bind(this);
    }

    backtoCart(event) {
        this.props.history.push("/cart");
    }

    handleInputChange = (event) =>
        this.setState({ [event.target.name]: event.target.value });

    change_card_info = () => {
        if (this.state.cardNumber.charAt(0) === "3") {
            this.setState({
                img_src: {AmEx},
                card_company: "American Express",
            });
        }
        if (this.state.cardNumber.charAt(0) === "4") {
            this.setState({
                img_src: {Visa},
                card_company: "Visa",
            });
        }
        if (this.state.cardNumber.charAt(0) === "5") {
            this.setState({
                img_src: {Mastercard},
                card_company: "Mastercard",
            });
        }
        if (this.state.cardNumber.charAt(0) === "6") {
            this.setState({
                img_src: {Discover},
                card_company: "Discover",
            });
        }
    };

    // Testing
    testClick(event) {
        if (this.state.first_number == "4") {
            this.setState({
                img_src: { Visa },
                card_company: "Visa",
            });
        }
        console.log(this.state.img_src, this.state.card_company, this.state.first_number, this.state.cardNumber.charAt(0));
    }

    componentWillMount() {
        this.change_card_info();
        // console.log(this.state.cardNumber.charAt(0));
        // this.change_card_info();
        // console.log("componentWillMount");
        // console.log(this.state.card_company);
        // console.log(this.state.card_image);
    }

    render() {
        const {img_src, card_company} = this.state;
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));

        return (
            <div className="checkout">
                <ThemeProvider theme={theme}>
                    <Header />
                    <div className="shipping_address_and_checkout_details_flex_container">
                        <div className="shipping_address_container">
                            <div className="shipping_address_flexbox_1">
                                <div className="shipping_heading">
                                    Shipping Address
                                </div>
                                <div className="name">{"Name"}</div>
                                <Button
                                    className="change_button"
                                    color="primary"
                                >
                                    Change
                                </Button>
                            </div>
                            <div className="street">Street</div>
                            <div className="city">City</div>
                            <div className="zip">Zipcode</div>
                        </div>
                        <div className="checkout_details_container">
                            <div className="order_summary">Order Summary:</div>
                            <div className="num_of_items_box">
                                <div className="num_of_items">
                                    {"Number of items: "}
                                </div>
                                <div className="num_of_items_num">20</div>
                            </div>
                            <div className="subtotal_box">
                                <div className="subtotal">{"Subtotal: "}</div>
                                <div className="subtotal_num">$5</div>
                            </div>
                            <div className="delivery_fees_box">
                                <div className="delivery_fees">
                                    {"Delivery fees: "}
                                </div>
                                <div className="delivery_fees_num">$3</div>
                            </div>
                            <div className="tax_fees_box">
                                <div className="tax_fees">{"Tax fees: "}</div>
                                <div className="tax_fees_num">$15</div>
                            </div>
                            <div className="order_total_box">
                                <div className="order_total">
                                    {"Order total: "}
                                </div>
                                <div className="order_total_num">$23</div>
                            </div>
                            <Button
                                className="place_your_order"
                                variant="contained"
                                color="primary"
                                // Event TODO
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
                                <img
                                    className="card_logo"
                                    src={img_src}
                                />
                                <div className="card_company">
                                    {card_company}
                                </div>
                                <div className="card_info">
                                    {" ending in "}
                                    {this.state.cardNumber.charAt(8)}
                                    {this.state.cardNumber.charAt(9)}
                                    {this.state.cardNumber.charAt(10)}
                                    {this.state.cardNumber.charAt(11)}
                                </div>
                                <Button
                                    className="change_button"
                                    color="primary"
                                >
                                    Change
                                </Button>
                            </div>
                            <div className="billing_address_flexbox">
                                <div className="billing_address_text">
                                    {"Billing address: "}
                                </div>
                                <div className="billing_address_body">
                                    {"Street num "}
                                    {"Street "}
                                    {"City "}
                                    {"State "}
                                    {"Zip "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review_items_subheading">Review items</div>
                    <div className="products_flex_container">
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
                                                {"Quantity: "}
                                                <input
                                                    className="quantity_input"
                                                    type="number"
                                                    value={cart[product.id]}
                                                    name="quantity"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                />
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
                                    <div className="store_flexbox">
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
                                        <Button
                                            className="remove_button"
                                            color="primary"
                                            productID={product.id}
                                            onClick={this.removeFromCart}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
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
                    <Button onClick={this.testClick}>TEST</Button>
                    <Footer />
                </ThemeProvider>
            </div>
        );
    }
}

export default Checkout;
