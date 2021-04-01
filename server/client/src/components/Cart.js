import React from "react";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./css/Cart.css";
import Footer from './Footer';
import Header from './Header';
import CartItem from './CartItem';
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

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: {},
            total: 0,
            quantity: 1,
        };
        this.backtoStore = this.backtoStore.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange = event => {
        const productID = event.currentTarget.getAttribute("productID");
        let cart = JSON.parse(localStorage.getItem('cart'));
        this.setState({ [event.target.name]: event.target.value })
    }

    backtoStore(event) {
        this.props.history.push("/home/stores");
    }
    callBack = () => {
        this.forceUpdate();
    }
    clearCart = () => {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartInfo");
        this.setState({ products: [] });
        this.props.history.push("/home/stores");
    };

    componentWillMount() {
        const distances = JSON.parse(localStorage.getItem("distances"));
        const names = [
            "Walmart",
            "Whole Foods",
            "Trader Joe's",
            "Ralphs",
            "Vons",
            "Costco",
            "Safeway",
            "Albertsons",
        ];
        const storeDistances = {};
        console.log(distances.rows[0].elements[0].distance.text);
        distances.rows[0].elements.forEach((element, i) => {
            storeDistances[names[i]] = element.distance.text;
        });
        localStorage.setItem("storeDistances", JSON.stringify(storeDistances));
        const search = JSON.parse(localStorage.getItem("search"));
        this.setState({
            storeDistances: storeDistances,
            search: search,
        });
    }

    render() {
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));

        if (cartInfo) {
            return (
                <div className="cart">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="product_body">
                            <Button
                                className="checkout_button"
                                component={Link}
                                to="/checkout"
                                variant="contained"
                                color="primary"
                            >
                                Continue to checkout
                        </Button>
                            <ul>
                                <div className="products_grid_wrapper">
                                    {
                                        cartInfo.map((product) =>
                                            <CartItem product={product} storeDistances={storeDistances} cart={cart} remove={this.callBack} />
                                        )
                                    }
                                </div>
                            </ul>
                        </div>
                        <Button
                            className="clear_cart_button"
                            variant="contained"
                            color="primary"
                            onClick={this.clearCart}
                        >
                            Clear Cart
                        </Button>
                        <Button
                            className="back_to_stores_button"
                            variant="contained"
                            color="primary"
                            onClick={this.backtoStore}
                        >
                            Back to Stores
                        </Button>
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
                        <Footer />
                    </ThemeProvider>
                </div>
            );
        }
    }
}
