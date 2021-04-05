import React, { Component } from "react";
import "./css/Stores.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import AuthenticationService from "./Authentication";
import Carousel from "./Carousel.js";
import Footer from "./Footer";
import Header from "./Header";
import { DistanceMatrixService } from "@react-google-maps/api";
import Geocode from "react-geocode";

Geocode.enableDebug();
Geocode.setApiKey("AIzaSyDUENlRwq9j2Zgz9NUIxHHFN9cnUa7SuBk");
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
            type: "",
            coordinate: [],
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
            this.props.history.push("/");
        }
    };

    handleClick = (stores) => {
        const store = stores.name;
        console.log(stores);
        console.log("TEST");
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
                        localStorage.setItem("store_name", JSON.stringify(stores));
                        localStorage.setItem("search", JSON.stringify(json));
                        this.props.history.push("/store");
                    }
                });
        } else {
            this.props.history.push("/");
        }
    };

    componentWillMount() {
        this.getData();
        const userAddress = JSON.parse(localStorage.getItem("user")).address;
        Geocode.fromAddress(userAddress).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const coordinate = [`${lat},${lng}`];
                this.setState({
                    coordinate: coordinate,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }

    categoryClick = (event) => {
        const type = event.currentTarget.dataset.buttonKey;
        const user = AuthenticationService.getCurrentUser();
        fetch("/home/type", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
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
                    const empty = [];
                    localStorage.setItem("search", JSON.stringify(empty));
                    this.props.history.push("/aisle");
                } else {
                    localStorage.setItem("search", JSON.stringify(json));
                    localStorage.setItem("category_type", JSON.stringify(type));
                    this.props.history.push("/aisle");
                }
            });
    };

    render() {
        const { isLoaded, stores, products, coordinate } = this.state;
        if (isLoaded) {
            return <div className="storesContainer">Loading.............</div>;
        } else {
            return (
                <div className="stores">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <Carousel className="stores_carousel" show={1}>
                            <Button className="stores_carousel_button">
                                <div className="stores_carousel_text">
                                    <div className="stores_carousel_heading_text">
                                        Fresh Groceries delivered to you
                                        <div className="stores_carousel_body_text">
                                            We'll take care of it.
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="stores_carousel_img"
                                    src="https://images.unsplash.com/photo-1543168256-418811576931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                            </Button>
                            <Button className="stores_carousel_button">
                                <div className="stores_carousel_text">
                                    <div className="stores_carousel_heading_text">
                                        Deals in every aisle!
                                        <div className="stores_carousel_body_text">
                                            Don't miss out!
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="stores_carousel_img"
                                    src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                            </Button>
                        </Carousel>
                        <div className="grocery_sections_header">
                            Looking for a certain aisle?
                        </div>
                        <Carousel className="category_carousel" show={9}>
                            <Button
                                className="carousel_item"
                                value="Meat"
                                data-button-key="Meat"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
                                />
                                <span className="carousel_caption">Meat</span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Vegetable"
                                data-button-key="Vegetable"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1575218823251-f9d243b6f720?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                                <span className="carousel_caption">
                                    Vegetable
                                </span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Bread"
                                data-button-key="Bread"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1614343884642-8964dff0a4a3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                />
                                <span className="carousel_caption">Bread</span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Pasta"
                                data-button-key="Pasta"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1586780845252-36ec7418b45e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                />
                                <span className="carousel_caption">Pasta</span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Canned Good"
                                data-button-key="Canned Good"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1531422888678-9f098cb924ea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                                />
                                <span className="carousel_caption">
                                    Canned Good
                                </span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Frozen Food"
                                data-button-key="Frozen Food"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1468769398733-d97298de3a06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
                                />
                                <span className="carousel_caption">
                                    Frozen Food
                                </span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Fruit"
                                data-button-key="Fruit"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1260&q=80"
                                />
                                <span className="carousel_caption">Fruit</span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Condiment"
                                data-button-key="Condiment"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1528750596806-ff12e21cda04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                />
                                <span className="carousel_caption">
                                    Condiment
                                </span>
                            </Button>
                            <Button
                                className="carousel_item"
                                value="Sweets"
                                data-button-key="Sweets"
                                onClick={this.categoryClick}
                            >
                                <img
                                    className="carousel_image"
                                    style={carousel_image_style}
                                    src="https://images.unsplash.com/photo-1581798459219-318e76aecc7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=812&q=80"
                                />
                                <span className="carousel_caption">Sweets</span>
                            </Button>
                        </Carousel>
                        <div className="stores_heading">Featured Stores</div>
                        <ul>
                            <div className="stores_grid_wrapper">
                                {stores.map((stores) => (
                                    <li className="grid_item" key={stores.id}>
                                        <Button
                                            className="store_button"
                                            style={store_button_style}
                                            tabIndex="0"
                                            type="button"
                                            /*href or onClick to redirect user*/
                                            value={stores.name}
                                            data-button-key={stores.name}
                                            onClick={ () => this.handleClick(stores)}
                                        >
                                            <span className="MuiButton-label">
                                                <ul>
                                                    {products.map(
                                                        (products) => (
                                                            <li
                                                                key={
                                                                    products.id
                                                                }
                                                            >
                                                                <div className="product_button">
                                                                    <Button
                                                                        variant="contained"
                                                                        value={
                                                                            products.className
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
                                                        )
                                                    )}
                                                </ul>
                                                <img
                                                    className="store_photo"
                                                    src={stores.photo}
                                                ></img>
                                                <span className="MuiTouchRipple-root"></span>
                                            </span>
                                            <div className="store_details">
                                                <div className="store_name">
                                                    {stores.name}
                                                </div>
                                                <div className="store_address">
                                                    {stores.address}
                                                </div>
                                                <div className="store_phone">
                                                    {stores.phone}
                                                </div>
                                            </div>
                                        </Button>
                                    </li>
                                ))}
                            </div>
                        </ul>
                        <DistanceMatrixService
                            options={{
                                destinations: [
                                    "34.079962,-117.582877",
                                    "34.136815,-117.442865",
                                    "34.081100,-117.243605",
                                    "34.023071,-117.408686",
                                    "34.004858,-117.493887",
                                    "33.922851,-117.367932",
                                    "33.941081,-117.601548",
                                    "34.114079,-117.359500",
                                ],
                                origins: coordinate,
                                travelMode: "DRIVING",
                            }}
                            callback={(response) => {
                                localStorage.setItem(
                                    "distances",
                                    JSON.stringify(response)
                                );
                            }}
                        />
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

const carousel_image_style = {
    borderRadius: 150 / 2,
};

const store_button_style = {
    maxWidth: "500px",
    minWidth: "500px",
    maxHeight: "150px",
    minHeight: "150px",
};

export default Stores;
