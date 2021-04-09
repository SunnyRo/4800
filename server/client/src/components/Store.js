import React, { Component } from "react";
import "./css/Store.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import Footer from "./Footer";
import StoreItem from "./StoreItem";
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

class Store extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: true,
            search: "",
            storeDistances: {},
            quantity: 1,
            productID: "",
            category_type: "",
            store_name: "",
        };
        this.backtoStore = this.backtoStore.bind(this);
        this.convertDistance = this.convertDistance.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }


    backtoStore() {
        this.props.history.push("/home/stores");
    }
    getProfile = () => {
        console.log("run get profile")
        const user = AuthenticationService.getCurrentUser();
        const currentUser = JSON.parse(localStorage.getItem("user"));
        fetch("/profile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                userEmail: currentUser.email,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    localStorage.setItem("profile", JSON.stringify(json));
                }
            });
    };
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
        const store_name = JSON.parse(localStorage.getItem("store_name"));
        this.setState({
            storeDistances: storeDistances,
            search: search,
            store_name: store_name,
        });
    }

    addToCart = (product, qty) => {
        console.log("Add to cart");
        let cart = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : {};
        let id = product.productID.toString();
        if (cart[id]) {
            cart[id] = cart[id];
        } else {
            cart[id] = 0;

            let cartInfo = localStorage.getItem("cartInfo")
                ? JSON.parse(localStorage.getItem("cartInfo"))
                : [];
            let item = {
                id: id,
                name: product.productname,
                price: product.unitPrice,
                type: product.type,
                photo: product.productphoto,
                address: product.address,
                phone: product.phone,
                store: product.storename,
            };
            cartInfo.push(item);
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        }
        let quantity = cart[id] + parseInt(qty);
        if (product.quantity < quantity) {
            cart[id] = product.quantity;
        } else {
            cart[id] = quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.forceUpdate();
    };

    convertDistance = (distance) => {
        const floatDistance = parseFloat(distance);
        const result = (floatDistance * 0.621371).toFixed(2);
        return result;
    };

    render() {
        const { storeDistances } = this.state;
        const search = JSON.parse(localStorage.getItem("search"));
        const store_name = JSON.parse(localStorage.getItem("store_name"));
        const product = this.props;

        if (search) {
            return (
                <div className="store">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="search_header">
                            <div className="store_name">
                                {store_name.name}
                            </div>
                            <div className="store_address">
                                {store_name.address}
                            </div>
                            <div className="store_phone">
                                {store_name.phone}
                            </div>
                            <div className="store_distance">
                                {this.convertDistance(storeDistances[store_name.name])}{" "}miles away
                            </div>
                        </div>

                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {search.map((product) => (
                                        <StoreItem
                                            product={product}
                                            storeDistances={storeDistances}
                                            addToCart={this.addToCart}
                                            convert={this.convertDistance}
                                        />
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

export default Store;
