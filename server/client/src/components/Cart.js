import React from "react";
import AuthenticationService from "./Authentication";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./css/Cart.css";
import Footer from "./Footer";
import Header from "./Header";
import CartItem from "./CartItem";

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

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: {},
            cartInfo: [],
            storeDistances: {},
            total: 0,
            quantity: 1,
        };
        this.backtoStore = this.backtoStore.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getReviews = this.getReviews.bind(this);
    }

    getReviews = (product) => {
        console.log("Run getReviews");
        const user = AuthenticationService.getCurrentUser();
        let productID = product.id.toString();

        fetch("/review", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                productID: productID,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    localStorage.setItem("productReviews", JSON.stringify(json));
                    if (json.length != 0) {
                        this.props.history.push("/productreviews");
                    } else {
                        alert("There are no reviews for this product!")
                    }
                }
            });
    };

    handleInputChange = (event) => {
        const productID = event.currentTarget.getAttribute("productID");
        let cart = JSON.parse(localStorage.getItem("cart"));
        this.setState({ [event.target.name]: event.target.value });
    };

    convertDistance = (distance) => {
        const floatDistance = parseFloat(distance);
        const result = (floatDistance * 0.621371).toFixed(2);
        return result;
    };

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

    componentWillMount() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        this.setState({
            cart: cart,
            cartInfo: cartInfo,
            storeDistances: storeDistances,
        });
    }

    backtoStore() {
        this.props.history.push("/home/stores");
    }

    checkout = () => {
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
                    this.props.history.push("/checkout");
                }
            });
    };

    clearCart = () => {
        // localStorage.removeItem("cart");
        // localStorage.removeItem("cartInfo");
        let cart = {};
        let cartInfo = [];
        this.setState({
            cartInfo: cartInfo,
            cart: cart,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        this.props.history.push("/home/stores");
        console.log(document.documentElement.offsetHeight);
    };

    render() {
        const { cartInfo, cart, storeDistances } = this.state;
        if (cartInfo && cartInfo.length != 0) {
            return (
                <div className="cart">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="cart_header">
                            {"Shopping Cart"}{" "}
                            {"(" + Object.keys(cart).length + " Items)"}
                        </div>
                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {cartInfo.map((product, index) => (
                                        <CartItem
                                            product={product}
                                            storeDistances={storeDistances}
                                            cart={cart}
                                            remove={this.removeFromCart}
                                            update={this.updateCart}
                                            convert={this.convertDistance}
                                            key={index}
                                            getReviews={this.getReviews}
                                        />
                                    ))}
                                </div>
                            </ul>
                            <div className="menu_buttons">
                                <div className="button_div">
                                    <Button
                                        className="checkout_button"
                                        onClick={this.checkout}
                                        to="/checkout"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Continue to checkout
                                    </Button>
                                </div>
                                <div className="button_div">
                                    <Button
                                        className="clear_cart_button"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.clearCart}
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                                <div className="button_div">
                                    <Button
                                        className="back_to_stores_button"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.backtoStore}
                                    >
                                        Back to Stores
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </ThemeProvider>
                </div>
            );
        } else {
            return (
                <div className="empty_cart_container">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="empty_cart">Your cart looks empty!</div>
                        <div className="back_to_stores">
                            <Button
                                className="back_to_store"
                                variant="contained"
                                color="primary"
                                onClick={this.backtoStore}
                            >
                                Back to Stores
                            </Button>
                        </div>
                        <div className="fixHeader"></div>
                        <Footer />
                    </ThemeProvider>
                </div>
            );
        }
    }
}
