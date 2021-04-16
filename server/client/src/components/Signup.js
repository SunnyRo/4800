import React, { Component } from "react";
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
            // item: [],
            // isLoaded: false,
        };

        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    register(event) {
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
                if (json.message === "invalid input") {
                    alert(json.message);
                } else {
                    alert("account created");
                    this.props.history.push("/");
                }
            });
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
                                min="2"
                                variant="standard"
                                type="firstname"
                                name="firstname"
                                color="primary"
                                style={style}
                                label="First Name"
                                value={this.state.firstname}
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                            ></TextField>
                        </div>
                        <div className="signup_row">
                            <TextField
                                required
                                variant="standard"
                                type="confirm_password"
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
