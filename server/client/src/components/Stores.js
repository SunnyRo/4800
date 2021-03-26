import React, { Component } from "react";
import "./css/Stores.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import Carousel from "./Carousel.js";
import { Carousel as GridCarousel } from "react-grid-carousel";
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
        this.testClick = this.testClick.bind(this);
    }
    logout = () => {
        AuthenticationService.signOut();
        window.location.reload();
    };
    // getData(event) {
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
                            isLoaded: true,
                        });
                    }
                });
        } else {
            // alert("please login")
            this.props.history.push("/");
        }
    };
    handleClick = (event) => {
        const store = event.currentTarget.dataset.buttonKey;
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            fetch("/home/products", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
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
    componentDidMount() {
        this.getData();
    }

    /*
    handleClick = () => {
        console.log("test");
    };
    */

    testClick = () => {
        console.log("test");
    };

    render() {
        const { isLoaded, stores, products } = this.state;

        if (!isLoaded) {
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
                        <Carousel className="categoryCarousel" show={8}>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/istockphoto-1212824120-612x612_400x400.jpg"
                                />
                                <span className="caption">Meats</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/Veggies_400x400.jpeg"
                                />
                                <span className="caption">Vegetables</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/download_1_250x250.jpg"
                                />
                                <span className="caption">Bakery</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/download_2_250x250.jpg"
                                />
                                <span className="caption">Fruits</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/shutterstock_1503786791-e1584728730892_2_600x400.jpg"
                                />
                                <span className="caption">Canned Goods</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/Condiments_600x400.jpg"
                                />
                                <span className="caption">Condiments</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/Sweets_600x400.jpg"
                                />
                                <span className="caption">Sweets</span>
                            </Button>
                            <Button
                                className="carouselItem"
                                onClick={this.testClick}
                            >
                                <img
                                    className="carouselImage"
                                    style={carouselImageStyle}
                                    src="http://www.simpleimageresizer.com/_uploads/photos/b84965aa/Frozen_Food_600x400.png"
                                />
                                <span className="caption">Frozen Food</span>
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
    maxWidth: "550px",
    minWidth: "550px",
    maxHeight: "150px",
    minHeight: "150px",
};

export default Stores;
