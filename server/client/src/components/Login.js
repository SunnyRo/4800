import React, { Component } from "react";
import {
    createMuiTheme,
    ThemeProvider,
    Button,
    TextField,
} from "@material-ui/core";
import "./css/Login.css";
import { Link } from "react-router-dom";
import Img from "./images/GroceryStore.jpg";
import Img2 from "./images/cartoondelivery.jpg";
import Header from "./Header";
import AuthenticationService from "./Authentication";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            accesstoken: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.signin = this.signin.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            this.props.history.push("/home/stores");
        }
    }

    // Testing
    signin = () => {
        const { email, password } = this.state;
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error) {
                    toast.error(json.error);
                } else {
                    localStorage.setItem("user", JSON.stringify(json));
                    this.props.history.push("/home/stores");
                }
            });
        fetch("/search/type", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.token) {
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    this.setState({
                        isType: true,
                    });
                    localStorage.setItem("type", JSON.stringify(json));
                }
            });
    };

    render() {
        return (
            <div className="login_container">
                <Header />
                <div>
                    <h1 className="heading">
                        Fresh groceries, delivered right to your door
                    </h1>
                </div>
                <div className="row">
                    <div className="left_column"></div>
                    <div className="right_column">
                        <div>
                            <h2 className="sign_in_heading">
                                Please sign in to continue
                            </h2>
                        </div>
                        <ThemeProvider theme={theme}>
                            <div className="sign_in_fields">
                                <TextField
                                    variant="standard"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    color="primary"
                                    style={style}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                ></TextField>
                            </div>
                            <br />
                            <div className="sign_in_fields">
                                <TextField
                                    variant="standard"
                                    type="password"
                                    name="password"
                                    label="Password"
                                    color="primary"
                                    style={style}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                ></TextField>
                            </div>
                            <br />
                            <div className="sign_up_fields">
                                <Button
                                    onClick={this.signin}
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    style={button}
                                >
                                    Sign In
                                </Button>
                            </div>
                            <div>
                                <h3>New to Growceries?</h3>
                            </div>
                            <div className="sign_up_fields">
                                <Button
                                    component={Link}
                                    to="/Signup"
                                    variant="contained"
                                    color="primary"
                                    style={button}
                                >
                                    Sign up here
                                </Button>
                            </div>
                        </ThemeProvider>
                    </div>
                </div>
                <div className="row">
                    <div className="left_column2">
                        <div className="left_column_heading">
                            Why choose Growceries?
                        </div>
                        <div className="left_column_body">
                            <div>
                                Growceries delivers in as little as an hour from
                                local grocery stores. Get the best products for
                                the best prices delivered right to your doostep.
                            </div>
                        </div>
                    </div>
                    <div className="right_column2"></div>
                </div>
                <div className="row">
                    <div className="left_column3">
                        <h2 className="local_stores_heading">
                            Support Local Grocery Stores
                        </h2>
                        <div className="local_stores_body">
                            <div>
                                Shopping local helps local businesses and it
                                also means your groceries arrive in a timely
                                manner.
                            </div>
                            <img
                                className="store_img"
                                src={Img}
                                alt="groceryStore"
                                width="auto"
                                height="150"
                            />
                        </div>
                    </div>
                    <div className="right_column3">
                        <h2 className="drivers_heading">
                            Great Delivery Drivers
                        </h2>
                        <div className="drivers_body">
                            Our delivery drivers are carefully selected in order
                            to ensure great service.
                        </div>
                        <img
                            className="driver_img"
                            src={Img2}
                            alt="deliverydriver"
                            width="auto"
                            height="150"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const style = {
    width: 300,
};

const button = {
    width: 300,
    height: 30,
    borderRadius: 20,
};

export default Login;
