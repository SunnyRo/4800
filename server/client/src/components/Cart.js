import React from 'react';
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from 'react-router-dom';
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
        localStorage.removeItem('cart');
        localStorage.removeItem('cartInfo');
        this.setState({ products: [] });
        this.props.history.push("/home/stores");
    }
    render() {
        const storeDistances = JSON.parse(localStorage.getItem("storeDistances"));
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cartInfo) {
            return (
                <div className="search">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="product_body">
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
                            className="back_to_store"
                            variant="contained"
                            color="primary"
                            onClick={this.backtoStore}
                        >
                            Back to Stores
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.clearCart}
                        >
                            Clear Cart
                        </Button>
                        <Footer />
                    </ThemeProvider>
                </div>
            );
        } else {
            return (<div className="storesContainer">
                <Header />
                <div>
                    No Item on the cart
                </div>
                <Button
                    className="back_to_store"
                    variant="contained"
                    color="primary"
                    onClick={this.backtoStore}
                >
                    Back to Stores
                </Button>
            </div>);
        }
    }
}
