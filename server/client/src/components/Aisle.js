import React, { Component } from "react";
import "./css/Aisle.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import Footer from "./Footer";
import AisleItem from "./AisleItem";
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

class Aisle extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: true,
            search: "",
            storeDistances: {},
            quantity: 1,
            productID: "",
            category_type: "",
        };
        this.logout = this.logout.bind(this);
        this.backtoStore = this.backtoStore.bind(this);
    }

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };

    backtoStore() {
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
        const category_type = JSON.parse(localStorage.getItem("category_type"));
        this.setState({
            storeDistances: storeDistances,
            search: search,
            category_type: category_type,
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
        const category_type = JSON.parse(localStorage.getItem("category_type"));

        if (search) {
            return (
                <div className="aisle">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="aisle_header">
                            {this.state.category_type} {" Aisle"}
                        </div>
                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {search.map((product) => (
                                        <AisleItem
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

export default Aisle;