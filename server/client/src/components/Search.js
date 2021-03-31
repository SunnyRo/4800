import React, { Component } from "react";
import "./css/Search.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Footer from "./Footer";

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

class Product extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: true,
            search: "",
        };
        this.logout = this.logout.bind(this);
        // this.getProducts = this.getProducts.bind(this);
        this.backtoStore = this.backtoStore.bind(this);
    }

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };
    backtoStore(event) {
        this.props.history.push("/home/stores");
    }
    render() {
        const search = JSON.parse(localStorage.getItem("search"));
        if (search) {
            return (
                <div className="search">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {search.map((product) => (
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
                                                    ${product.unitPrice}
                                                </div>
                                                <div className="product_type">
                                                    Type: {product.type}
                                                </div>
                                                <div className="product_quantity">
                                                    Currently {product.quantity} in stock!
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
                                                    0.5 miles
                                                </div>
                                            </div>
                                            <Button
                                                className="add_to_cart_button"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add to Cart
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
