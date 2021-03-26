import React, { Component } from "react";
import "./css/Stores.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import DynamicForm from "./DynamicForm";
import AuthenticationService from "./Authentication";
import Carousel from "./Carousel.js";
import { Carousel as GridCarousel } from "react-grid-carousel";
import Footer from "./Footer";
import Header from "./Header";
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

class Stores extends Component {
    constructor() {
        super();
        this.state = {
            stores: [],
            products: [],
            isLoaded: false,
            type: ""
        };
        this.logout = this.logout.bind(this);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.categoryClick = this.categoryClick.bind(this);
    }
    logout = () => {
        AuthenticationService.signOut();
        window.location.reload();
    };

    getData = async () => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            fetch("/home/stores", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + user.accesstoken,
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
    }
    handleClick = (event) => {
        const store = event.currentTarget.dataset.buttonKey;
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            fetch("/home/products", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({
                    store: store,
                }),
            })
                .then((Response) => Response.json())
                .then((json) => {
                    if (json.error === "TokenExpiredError") {
                        console.log(json.error);
                        localStorage.clear();
                        this.props.history.push("/");
                    } else {
                        localStorage.setItem("products", JSON.stringify(json));
                        this.props.history.push("/home/products");
                    }
                });
        } else {
            this.props.history.push("/");
        }
    };
    componentWillMount() {
        console.log("willmount")
        this.getData();
    }
    categoryClick = (event) => {
        const type = event.currentTarget.dataset.buttonKey;
        console.log(type)
        const user = AuthenticationService.getCurrentUser();
        fetch("/home/type", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "authorization": "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                type: type,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else if (json.message) {
                    const empty = []
                    localStorage.setItem("search", JSON.stringify(empty));
                    this.props.history.push("/search");
                } else {
                    localStorage.setItem("search", JSON.stringify(json));
                    this.props.history.push("/search");
                }
            });
    };
    render() {
        const { isLoaded, stores, products } = this.state;

        if (isLoaded) {
            return <div className="storesContainer">Loading.............</div>;
        } else {
            return (
                <div className="App">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <Carousel className="storesCarousel" show={1}>
                            <Button className="storesCarouselButton">
                                <div className="storesCarouselText">
                                    <div className="storesCarouselHeadingText">
                                        Fresh Groceries delivered to you
                                        <div className="storesCarouselBodyText">
                                            We'll take care of it.
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="storesCarouselImg"
                                    src="https://images.unsplash.com/photo-1543168256-418811576931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                            </Button>
                            <Button className="storesCarouselButton">
                                <div className="storesCarouselText">
                                    <div className="storesCarouselHeadingText">
                                        Deals in every aisle!
                                        <div className="storesCarouselBodyText">
                                            Don't miss out!
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="storesCarouselImg"
                                    src="https://images.unsplash.com/photo-1543168256-418811576931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                            </Button>
                        </Carousel>
                        <div className="grocerySectionsHeader">
                            Looking for a certain aisle?
                        </div>
                        <Carousel className="categoryCarousel" show={9}>
                            <Button
                                className="carouselItem"
                                value="meat"
                                data-button-key="meat"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
                                />
                                <span className="caption">Meat</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="vegetable"
                                data-button-key="vegetable"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1575218823251-f9d243b6f720?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                                <span className="caption">Vegetable</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="bread"
                                data-button-key="bread"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1614343884642-8964dff0a4a3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                />
                                <span className="caption">Bread</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="pasta"
                                data-button-key="pasta"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1586780845252-36ec7418b45e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                />
                                <span className="caption">Pasta</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="canned good"
                                data-button-key="canned good"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1531422888678-9f098cb924ea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                                />
                                <span className="caption">Canned Good</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="frozen food"
                                data-button-key="frozen food"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1468769398733-d97298de3a06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
                                />
                                <span className="caption">Frozen Food</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="fruit"
                                data-button-key="fruit"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1260&q=80"
                                />
                                <span className="caption">Fruit</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="condiment"
                                data-button-key="condiment"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1528750596806-ff12e21cda04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                                <span className="caption">Condiment</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                value="sweets"
                                data-button-key="sweets"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="https://images.unsplash.com/photo-1581798459219-318e76aecc7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=812&q=80"
                                />
                                <span className="caption">Sweets</span>
                            </Button>
                        </Carousel>
                        <div className="storesHeading">Featured Stores</div>
                        <ul>
                            <div className="gridWrapper">
                                {stores.map((stores) => (
                                    <li key={stores.id}>
                                        <Button
                                            className="storeButton"
                                            style={storeButtonStyle}
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
                                    </li>
                                ))}
                            </div>
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
                    </ThemeProvider>
                    <Footer />
                </div>
            );
        }
    }
}

const style = {
    margin: 5,
};

const carouselImageStyle = {
    borderRadius: 150 / 2,
};

const storeButtonStyle = {
    maxWidth: "430px",
    minWidth: "350px",
    maxHeight: "150px",
    minHeight: "150px",
};

export default Stores;
