import React, { Component } from "react";
import "./css/Stores.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import DynamicForm from "./DynamicForm";
import AuthenticationService from "./Authentication";
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
                            isLoaded: true,
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
    componentDidMount() {
        this.getData();
    }

    /* Testing
  handleClick = () => {
    console.log(this.state.stores[0].name)
    console.log(this.state.stores[0].phone)
    console.log(this.state.stores[0].address)
  }
  */

    render() {
        const { isLoaded, stores, products } = this.state;

        if (!isLoaded) {
            return (
                <div className="storesContainer">
                    Loading.............
                </div>
            );
        } else {
            return (
                <div className="App">
                    <ThemeProvider theme={theme}>
                        <Header />
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
