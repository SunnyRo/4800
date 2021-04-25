import React, { Component, useState } from "react";
import "./css/Signup.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import render from "@testing-library/react";
import {
    createMuiTheme,
    ThemeProvider,
    Button,
    TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import Login from "./Login";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import { red } from "@material-ui/core/colors";
import validator from "validator";
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

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: "",
            number: "",
            street: "",
            city: "",
            zipcode: "",
            field: {},
            errors: {},
            password_strength: false,
            // item: [],
            // isLoaded: false,
        };

        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            return this.props.history.push("/home/stores");
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.validatePassword(event.target.value);
    }

    validatePassword = (password) => {
        if (
            validator.isStrongPassword(password, {
                minLength: 7,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            this.setState({
                password_strength: true,
            });
        } else {
            this.setState({
                password_strength: false,
            });
        }
    };

    handleChangeText = (event) => {
        const re = /^[A-Za-z\s]*$/;

        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value });
        } else {
            if (event.target.name === "firstname") {
                // alert("Please enter a valid first name!");
                toast.error("Please enter a valid first name!");
            } else if (event.target.name === "lastname") {
                // alert("Please enter a valid last name!");
                toast.error("Please enter a valid last name!");
            } else if (event.target.name === "street") {
                // alert("Please enter a valid street!");
                toast.error("Please enter a valid street!");
            } else if (event.target.name === "city") {
                // alert("Please enter a valid city!");
                toast.error("Please enter a valid city!");
            } else {
                // alert("Please enter a valid input!");
                toast.error("Please enter a valid input!");
            }
        }
    };

    handleChangeNumber = (event) => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value });
        } else {
            if (event.target.name === "phone") {
                // alert("Please enter a valid 10-digit phone number!");
                toast.error("Please enter a valid 10-digit phone number!");
            } else if (event.target.name === "number") {
                // alert("Please enter a valid street number!");
                toast.error("Please enter a valid street number!");
            } else if (event.target.name === "zipcode") {
                // alert("Please enter a valid zipcode!");
                toast.error("Please enter a valid zipcode!");
            } else {
                // alert("Please enter a valid input!");
                toast.error("Please enter a valid input!");
            }
        }
    };

    register(event) {
        event.preventDefault();

        const {
            firstname,
            lastname,
            email,
            phone,
            password,
            confirm_password,
            number,
            street,
            city,
            zipcode,
        } = this.state;
        this.validatePassword(password);
        if (confirm_password !== password) {
            toast.error("Passwords do not match! Please try again.");
        } else {
            if (this.state.password_strength === true) {
                fetch("/signup", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        phone: phone,
                        password: password,
                        number: number,
                        street: street,
                        city: city,
                        zipcode: zipcode,
                    }),
                })
                    .then((Response) => Response.json())
                    .then((json) => {
                        if (json.error) {
                            toast.error(json.error);
                        } else {
                            toast.success(json.message);
                            this.props.history.push("/");
                        }
                    });
            } else {
                toast.info(
                    "Password is not strong enough! Please try again with at least 7 characters, one uppercase letter, one lowercase letter, one number, and one symbol."
                );
            }
        }
    }

    render() {
        return (
            <div className="signup_container">
                <div>
                    <Header />
                </div>
                <form onSubmit={this.register}>
                    <ThemeProvider theme={theme}>
                        <div className="heading">
                            <h1>Create your Growceries account here!</h1>
                        </div>
                        <div className="signup_row">
                            <div className="user_text">User Info</div>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="firstname"
                                name="firstname"
                                color="primary"
                                style={style}
                                label="First Name"
                                value={this.state.firstname}
                                onChange={this.handleChangeText}
                            ></TextField>
                            <TextField
                                required
                                variant="standard"
                                type="lastname"
                                name="lastname"
                                color="primary"
                                style={style}
                                label="Last Name"
                                value={this.state.lastname}
                                onChange={this.handleChangeText}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="password"
                                name="password"
                                label="Password"
                                color="primary"
                                style={style}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="password"
                                name="confirm_password"
                                label="Confirm Password"
                                color="primary"
                                style={style}
                                value={this.state.confirm_password}
                                onChange={this.handleChange}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="email"
                                name="email"
                                color="primary"
                                style={style}
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="phone"
                                name="phone"
                                color="primary"
                                style={style}
                                label="Phone Number"
                                value={this.state.phone}
                                onChange={this.handleChangeNumber}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <div className="address_text">Address</div>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="street_number"
                                name="number"
                                color="primary"
                                style={style}
                                label="Number"
                                value={this.state.number}
                                onChange={this.handleChangeNumber}
                            ></TextField>
                        </div>
                        <div className="signupRow">
                            <TextField
                                required
                                variant="standard"
                                type="street"
                                name="street"
                                color="primary"
                                style={style}
                                label="Street"
                                value={this.state.street}
                                onChange={this.handleChangeText}
                            ></TextField>
                        </div>
                        <div className="signupRow">
                            <TextField
                                required
                                variant="standard"
                                type="city"
                                name="city"
                                color="primary"
                                style={style}
                                label="City"
                                value={this.state.city}
                                onChange={this.handleChangeText}
                            ></TextField>
                        </div>
                        <div className="signupRow">
                            <TextField
                                required
                                variant="standard"
                                type="zipcode"
                                name="zipcode"
                                color="primary"
                                style={style}
                                label="Zipcode"
                                value={this.state.zipcode}
                                onChange={this.handleChangeNumber}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <Button
                                className="signup_button"
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={button}
                            >
                                Sign up
                            </Button>
                        </div>
                        <div className="signup_row">
                            <h3 className="already_have_an_account">
                                Already have an account?
                            </h3>
                        </div>
                        <div className="signup_row">
                            <Button
                                component={Link}
                                to="/"
                                variant="contained"
                                color="primary"
                                style={button}
                            >
                                Log in here
                            </Button>
                        </div>
                    </ThemeProvider>
                </form>
            </div>
        );
    }
}

const style = {
    margin: 5,
    width: 300,
};
const button = {
    width: 300,
    height: 30,
    borderRadius: 20,
};
export default Signup;
