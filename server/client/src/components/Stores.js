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
            item: [],
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
                    items: json,
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
        const store = e.target.value;
        console.log(store);
        fetch("/home/stores", {
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
                    items: json,
                    isLoaded: true,
                });
            });
    };

    render() {
        const { isLoaded, items } = this.state;

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
                            {items.map((item) => (
                                <li key={item.id}>
                                    <div className="storeButton">
                                        <button
                                            class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-contained"
                                            tabIndex="0"
                                            type="button"
                                            /*href or onClick to redirect user*/
                                            value={item.name}
                                            data-button-key={item.name}
                                            onClick={(e) => {
                                                console.log(e.currentTarget.dataset.buttonKey)
                                            }}
                                        >
                                                <span class="MuiButton-label">
                                                    <img
                                                        className="storePhoto"
                                                        src={item.photo}
                                                    ></img>
                                                    <span class="MuiTouchRipple-root"></span>
                                                </span>
                                                <div className="storeDetails">
                                                    <div className="storeName">
                                                        {item.name}
                                                    </div>
                                                    <div className="storeAddress">
                                                        {item.address}
                                                    </div>
                                                    <div className="storePhone">
                                                        {item.phone}
                                                    </div>
                                                </div>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
                /*
            </div>
            */
            );
        }
    }
}

const style = {
    margin: 5,
};

export default Stores;
