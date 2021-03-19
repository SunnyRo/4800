import React, { Component } from "react";
import "./css/Products.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            unitPrice: "",
            type: "",
            item: [],
            state: props.state,
            isLoaded: false,
        }
        this.logout = this.logout.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.backtoStore = this.backtoStore.bind(this);
    }

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };

    getProducts(event) {
        fetch("/home/products", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((Response) => Response.json())
            .then((json) => {
                this.setState({
                    items: json,
                    isLoaded: true,
                });
            });
    }

    backtoStore(event) {
        this.props.history.push("/home/stores");
    }
    render() {
        const products = JSON.parse(localStorage.getItem("products"));
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
    }
}

export default Product;