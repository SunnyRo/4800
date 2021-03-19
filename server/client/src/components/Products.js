import React, { Component } from "react";
import "./css/Products.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Redirect } from "react-router";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // name: "",
            // unitPrice: "",
            // type: "",
            // item: [],
            // state: props.state,
            // isLoaded: false,
            products: undefined,
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
        const products = JSON.parse(localStorage.getItem("products"));
        if (!products.error) {
            return (
                <div>
                    <Header />
                    <div className="product__body">
                        {products.map((product) => (
                            <ul>
                                <div className="product__layout">
                                    <div className="product__name">
                                        {product.name}
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
                    <div className="fixingFooter"></div>
                </div>
            )

        } else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

export default Product;