import React, { Component } from "react";
import Navbar from "./Navbar";
import "./css/Stores.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import DynamicForm from "./DynamicForm";
import AuthenticationService from "./Authentication";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#06C167",
        },
        secondary: {
            main: "#06C167",
        },
    },
});

class Stores extends Component {
    constructor() {
        super();
        this.state = {
            storeID: "",
            name: "",
            address: "",
            phone: "",
            stores: [],
            products: [],
            isLoaded: false,
            photo:
                "https://1000logos.net/wp-content/uploads/2017/05/Walmart-logo.png",
        };
        this.logout = this.logout.bind(this);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };

    getData(event) {
        fetch("/home/stores", {
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
                    stores: json,
                    isLoaded: true,
                });
            });
    }

    /* Testing
    handleClick = () => {
        console.log(this.state.stores[0].name)
        console.log(this.state.stores[0].phone)
        console.log(this.state.stores[0].address)
    }
    */

    handleClick = (e) => {
        console.log(e.currentTarget.dataset.buttonKey);
        const store = e.currentTarget.dataset.buttonKey;
        fetch("/home/products", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                store: store,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                this.setState({
                    products: json,
                    isLoaded: true,
                });
                // console.log("products")
                // console.log(JSON.stringify(json))
                // console.log(this.state.products)
                // this.props.history.push({
                //     pathname: "/home/products",
                //     state: json
                // });
                localStorage.setItem("products", JSON.stringify(json));
                this.props.history.push("/home/products");
            });
    };

    render() {
        const { isLoaded, stores, products } = this.state;

        if (!isLoaded) {
            return (
                <div className="storesContainer">
                    <ThemeProvider theme={theme}>
                        <Button
                            onClick={this.getData}
                            variant="contained"
                            style={style}
                            color="primary"
                        >
                            Stores
                        </Button>
                        <Button
                            onClick={this.logout}
                            variant="contained"
                            style={style}
                            color="primary"
                        >
                            log out
                        </Button>
                    </ThemeProvider>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <ThemeProvider theme={theme}>
                        <Navbar />
                        <div className="storesHeading">Featured Stores</div>
                        <ul>
                            {stores.map((stores) => (
                                <li key={stores.id}>
                                    <div className="storeButton">
                                        <Button
                                            variant="contained"
                                            tabIndex="0"
                                            type="button"
                                            /*href or onClick to redirect user*/
                                            value={stores.name}
                                            data-button-key={stores.name}
                                            onClick={this.handleClick}
                                        >
                                            <span className="MuiButton-label">
                                                {products.map((products) => (
                                                    <li key={products.id}>
                                                        <div className="productbutton">
                                                            <Button
                                                                variant="contained"
                                                                value={
                                                                    products.name
                                                                }
                                                                data-button-key={
                                                                    products.name
                                                                }
                                                            >
                                                                <div>
                                                                    {
                                                                        products.name
                                                                    }
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    </li>
                                                ))}
                                                <img
                                                    className="storePhoto"
                                                    src={stores.photo}
                                                ></img>
                                                <span className="MuiTouchRipple-root"></span>
                                            </span>
                                            <div className="storeDetails">
                                                <div className="storeName">
                                                    {stores.name}
                                                </div>
                                                <div className="storeAddress">
                                                    {stores.address}
                                                </div>
                                                <div className="storePhone">
                                                    {stores.phone}
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
                        <div>
                            <Button
                                onClick={this.logout}
                                variant="contained"
                                style={style}
                                color="primary"
                            >
                                log out
                            </Button>
                        </div>
                    </ThemeProvider>
                </div>
            );
        }
    }
}

const style = {
    margin: 5,
};

export default Stores;
