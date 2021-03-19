import React, { Component } from "react";
import "./css/Products.css";
import AuthenticationService from "./Authentication";
import Navbar from "./Navbar";
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
    }

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };
    // componentDidMount() {
    //     const products = JSON.parse(localStorage.getItem("products"));
    //     console.log(products)
    //     this.setState({
    //         item: products
    //     })
    //     console.log(this.item)
    // }

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
        const products = JSON.parse(localStorage.getItem("products"));
        return (
            <div>
                {/* <Headers></Headers> */}
                <ul>
                    {products.map((products) => (
                        <li key={products.id}>
                            <div className="productbutton">
                                <Button
                                    variant="contained"
                                    value={products.name}
                                    data-button-key={products.name}
                                >
                                    <div>{products.name}</div>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Product;