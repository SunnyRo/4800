import React, { Component } from "react";
import "./css/Products.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Redirect } from "react-router";
import Footer from "./Footer";

class Product extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: true,
            search: '',
        }
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
                <div>
                    <Header />
                    <div className="product__body">
                        {search.map((product) => (
                            <ul>
                                <div className="product__layout">
                                    <div className="product__img">
                                        <img src={product.productphoto}></img>
                                    </div>
                                    <div className="product__name">
                                        <div className="product__info">
                                            Product
                                        </div>
                                        <div className="product__info">
                                            {product.productname}
                                        </div>
                                    </div>
                                    <div className="product__name">
                                        <div className="product__info">
                                            Store
                                        </div>
                                        <div className="product__info">
                                            {product.storename}
                                        </div>
                                        <div className="product__info">
                                            {product.phone}
                                        </div>
                                        <div className="product__info">
                                            {product.address}
                                        </div>
                                    </div>
                                    <div className="product__detail">
                                        <div className="product__info">
                                            Type: {product.type}
                                        </div>
                                        <div className="product__info">
                                            Price: ${product.unitPrice}
                                        </div>
                                        <div className="product__info">
                                            In stock: {product.quantity}
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        ))}
                    </div>
                    <Button onClick={this.backtoStore}>Back to Stores</Button>
                    <Footer />
                </div>
            )

        } else {
            return (
                <div className="storesContainer">
                    Loading.............
                </div>
            );
        }
    }
}

export default Product;