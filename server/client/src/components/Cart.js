import React from 'react';
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from 'react-router-dom';
import "./css/Cart.css";
import Footer from './Footer';
import Header from './Header';
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
            total: 0
        };
        this.backtoStore = this.backtoStore.bind(this);
    }
    backtoStore(event) {
        this.props.history.push("/home/stores");
    }
    removeFromCart = (event) => {
        const productID = event.currentTarget.getAttribute("productID");
        let cart = JSON.parse(localStorage.getItem('cart'));
        let cartInfo = JSON.parse(localStorage.getItem('cartInfo'));
        const filteredItems = cartInfo.filter(item => item.id !== productID)
        // const index = cartInfo.indexOf(productID)
        delete cart[productID];
        this.setState({
            cart: cart
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartInfo', JSON.stringify(filteredItems));
        // let total = this.state.total - (product.qty * product.price)
        // this.setState({ products, total });
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
                                    {cartInfo.map((product) => (
                                        <div className="product_layout">
                                            <div className="store_name">
                                                {product.store}
                                            </div>
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
                                                    ${product.price}
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
                                                    {storeDistances[product.store]} away.
                                                </div>
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                productID={product.id}
                                                onClick={this.removeFromCart}
                                            >Remove
                                            </Button>
                                        </div>
                                    ))}
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
