import React, { Component } from "react";
import "./css/Products.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Redirect } from "react-router";
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
            stores: [],
        };
        this.getData = this.getData.bind(this);
        this.logout = this.logout.bind(this);
        // this.getProducts = this.getProducts.bind(this);
        this.backtoStore = this.backtoStore.bind(this);
    }

    getData = async () => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            fetch("/home/stores", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({}),
            })
                .then((Response) => Response.json())
                .then((json) => {
                    if (json.error === "TokenExpiredError") {
                        console.log(json.error);
                        localStorage.clear();
                        this.props.history.push("/");
                    } else {
                        this.setState({
                            stores: json,
                            isLoad: true,
                        });
                    }
                });
        } else {
            // alert("please login")
            this.props.history.push("/");
        }
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
        console.log("willmount");
        this.getData();
    }

    render() {
        const products = JSON.parse(localStorage.getItem("products"));
        const { stores } = this.state;

        if (!products.error) {
            return (
                <div className="products">
                    <ThemeProvider theme={theme}>
                        <Header />

                        {/* TODO */}
                        {/*
                        <div className="store_banner">
                            <img className="store_banner_photo"
                                src={stores.photo}
                            ></img>
                            <div className="store_name">

                            </div>
                            <div className="store_address">
                            
                            </div>
                            <div className="store_phone">

                            </div>
                        </div>
                        */}

                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {products.map((product) => (
                                        <div className="product_layout">
                                            <img
                                                className="product_image"
                                                src={product.photo}
                                            ></img>
                                            <div className="product_name">
                                                {product.name}
                                            </div>
                                            <div className="product_detail">
                                                <div className="product_price">
                                                    ${product.unitPrice}
                                                </div>
                                                <div className="product_type">
                                                    Type: {product.type}
                                                </div>
                                                <div className="product_quantity">
                                                    Currently {product.quantity}{" "}
                                                    in stock!
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
            return <Redirect to="/" />;
        }
    }
}

export default Product;
