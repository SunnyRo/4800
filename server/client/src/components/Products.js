import React, { Component } from "react";
import "./css/Products.css";
import AuthenticationService from "./Authentication";
import Navbar from "./Navbar";

class Product extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            unitPrice: "",
            type: "",
            item: [],
            isLoaded: false,
        }
        this.logout = this.logout.bind(this);
        this.getProducts = this.getProducts.bind(this);
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

    render() {
        return (
            <Navbar />
        )
    }
}

export default Product;