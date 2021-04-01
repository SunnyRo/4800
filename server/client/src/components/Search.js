import React, { Component } from "react";
import "./css/Search.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import Footer from "./Footer";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";

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

class Product extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: true,
            search: "",
            storeDistances: {},
            quantity: 1,
            productID: "",
        };
        this.logout = this.logout.bind(this);
        this.backtoStore = this.backtoStore.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.quantity);
    };

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };

    backtoStore(event) {
        this.props.history.push("/home/stores");
    }

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

    addToCart = (event) => {
        console.log("Add to cart");
        const productID = event.currentTarget.getAttribute("productID");
        const instock = parseInt(
            event.currentTarget.getAttribute("instock"),
            10
        );
        const productName = event.currentTarget.getAttribute("productName");
        const productPrice = event.currentTarget.getAttribute("productPrice");
        const productType = event.currentTarget.getAttribute("productType");
        const productPhoto = event.currentTarget.getAttribute("productPhoto");
        const productAddress = event.currentTarget.getAttribute(
            "productAddress"
        );
        const productPhone = event.currentTarget.getAttribute("productPhone");
        const storeName = event.currentTarget.getAttribute("storeName");
        let cart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : {};
        let id = productID.toString();
        if (cart[id]) {
            cart[id] = cart[id];
        } else {
            cart[id] = 0;
            let cartInfo = localStorage.getItem("cartInfo")
                ? JSON.parse(localStorage.getItem("cartInfo"))
                : [];
            let item = {
                id: id,
                name: productName,
                price: productPrice,
                type: productType,
                photo: productPhoto,
                address: productAddress,
                phone: productPhone,
                store: storeName,
            };
            cartInfo.push(item);
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        }
        let quantity = cart[id] + parseInt(this.state.quantity);
        if (instock < quantity) {
            cart[id] = instock;
        } else {
            cart[id] = quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    render() {
        const { storeDistances } = this.state;
        const search = JSON.parse(localStorage.getItem("search"));

        if (search) {
            return (
                <div className="search">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {search.map((product, productID) => (
                                        <div className="product_layout">
                                            <div className="store_name">
                                                {product.storename}
                                            </div>
                                            <div className="product_image_container">
                                                <img
                                                    className="product_image"
                                                    src={product.productphoto}
                                                ></img>
                                            </div>
                                            <div className="product_details">
                                                <div className="product_name">
                                                    {product.productname}
                                                </div>
                                                <div className="product_price">
                                                    $
                                                    {product.unitPrice.toFixed(
                                                        2
                                                    )}
                                                </div>
                                                <div className="product_type">
                                                    Type: {product.type}
                                                </div>
                                                <div className="product_quantity">
                                                    Currently {product.quantity}{" "}
                                                    in stock!
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
                                                        storeDistances[
                                                            product.storename
                                                        ]
                                                    )}
                                                    {" miles away"}
                                                </div>
                                            </div>
                                            {parseInt(product.quantity, 10) >
                                            0 ? (
                                                <div className="addtocart_div">
                                                    <Button
                                                        className="add_to_cart_button"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.addToCart}
                                                        productID={
                                                            product.productID
                                                        }
                                                        instock={
                                                            product.quantity
                                                        }
                                                        productName={
                                                            product.productname
                                                        }
                                                        productPrice={
                                                            product.unitPrice
                                                        }
                                                        productType={
                                                            product.type
                                                        }
                                                        productPhoto={
                                                            product.productphoto
                                                        }
                                                        productAddress={
                                                            product.address
                                                        }
                                                        productPhone={
                                                            product.phone
                                                        }
                                                        storeName={
                                                            product.storename
                                                        }
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                    <div key={productID}>
                                                        <input
                                                            type="number"
                                                            value={
                                                                this.state
                                                                    .quantity[
                                                                    product
                                                                ]
                                                            }
                                                            name="quantity"
                                                            onChange={
                                                                this
                                                                    .handleInputChange
                                                            }
                                                            className="quantity_input"
                                                            min="0"
                                                            max="10"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-danger">
                                                    Product is out of stock
                                                </div>
                                            )}
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
                        <Footer />
                    </ThemeProvider>
                </div>
            );
        } else {
            return <div className="storesContainer">Loading.............</div>;
        }
    }
}

export default Product;
