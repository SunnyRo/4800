import { React, Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
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

        return (
            <div className="checkout">
                <ThemeProvider theme={theme}>
                    <Header />
                    {cartInfo.map((product) => (
                        <div className="product_layout">
                            <div className="store_name">{product.store}</div>
                            <div className="product_image_container">
                                <img
                                    className="product_image"
                                    src={product.photo}
                                ></img>
                            </div>
                            <div className="product_details">
                                <div className="product_name">
                                    {product.name}
                                </div>
                                <div className="product_price">
                                    ${parseFloat(product.price).toFixed(2)}
                                </div>
                                <div className="product_type">
                                    Type: {product.type}
                                </div>
                                <div className="product_quantity">
                                    Quantity: {cart[product.id]}
                                </div>
                            </div>
                            <div className="store_details">
                                <div className="store_address">
                                    {product.address}
                                </div>
                                <div className="store_phone">
                                    {product.phone}
                                </div>
                                <div className="store_distance">
                                    {convertDistance(
                                        storeDistances[product.store]
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
                    ))}
                    <div className="checkout_details">
                        Total Price: blah blah
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
