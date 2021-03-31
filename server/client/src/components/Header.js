import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import Img from "./images/Growceries.PNG";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AuthenticationService from "./Authentication";
import CreateIcon from "@material-ui/icons/Create";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Profile from "./Profile";
import { useHistory, withRouter } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            isload: false,
            type: "",
            user: "",
            searchterm: "",
        };
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getProfile = () => {
        const user = AuthenticationService.getCurrentUser();
        fetch("/profile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                searchterm: this.state.searchterm,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    localStorage.setItem("profile", JSON.stringify(json));
                    this.props.history.push("/profile");
                }
            });
    };
    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        // window.location.reload();
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        const user = AuthenticationService.getCurrentUser();
        if (this.state.type === "") {
            fetch("/search/products", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({
                    searchterm: this.state.searchterm,
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
                        this.props.history.push("/search");
                    } else {
                        localStorage.setItem("search", JSON.stringify(json));
                        this.props.history.push("/search");
                    }
                });
        } else {
            fetch("/search/products/type", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({
                    searchterm: this.state.searchterm,
                    type: this.state.type,
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
                        this.props.history.push("/search");
                    } else {
                        localStorage.setItem("search", JSON.stringify(json));
                        this.props.history.push("/search");
                    }
                });
        }
        // event.preventDefault();
    }
    render() {
        const type = JSON.parse(localStorage.getItem("type"));
        const user = JSON.parse(localStorage.getItem("user"));
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if (user && type) {
            return (
                <nav className="header">
                    <div className="header_logo">
                        <Link to="/">
                            <img src={Img}></img>
                        </Link>
                    </div>
                    <div className="header_location">
                        <LocationOnIcon />
                        <span>{user.address}</span>
                    </div>
                    <form className="header_search">
                        <select
                            className="header_searchCategory"
                            type="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <option value="">&nbsp;&nbsp;&nbsp;All</option>
                            {type.map((type) => (
                                <option value={type.type}>{type.type}</option>
                            ))}
                        </select>
                        <input
                            type="searchterm"
                            name="searchterm"
                            onKeyPress={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            value={this.state.searchterm}
                            onChange={this.handleChange}
                            className="header_searchInput"
                        ></input>
                        <SearchIcon
                            onClick={this.handleSubmit}
                            type="submit"
                            value="Submit"
                            className="header_searchIcon"
                        ></SearchIcon>
                    </form>
                    <div className="header_nav">
                        {/* 1st Link */}
                        <Link
                            onClick={this.getProfile}
                            className="header_link"
                        >
                            <div className="header_mainOption">
                                <AccountBoxIcon className="header_accountIcon" />
                                <div className="header_option">
                                    <span className="header_optionLine1">
                                        Hello
                                    </span>
                                    <span className="header_optionLine2">
                                        {user.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {/* 3rd Link */}
                        <Link
                            to="/cart"
                            className="header_link"
                        >
                            <div className="header_mainOption">
                                <ShoppingCartIcon className="header_cartIcon" />
                                <div className="header_cartCount">
                                    <span className="header_optionLine1">
                                        {Object.keys(cart).length}
                                    </span>
                                    <span className="header_optionLine2">
                                        Cart
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {/* 2nd Link */}
                        <Link to="/home/stores" className="header_link">
                            <div className="header_mainOption">
                                <ReceiptIcon className="header_orderIcon" />
                                <div className="header_option">
                                    <span className="header_optionLine1">
                                        returns
                                    </span>
                                    <span className="header_optionLine2">
                                        orders
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {/* 4th Link */}
                        <Link
                            to="/"
                            onClick={this.logout}
                            className="header_link"
                        >
                            <div className="header_option">
                                <span className="header_optionLine1">
                                    Done
                                </span>
                                <span className="header_optionLine2">
                                    Logout
                                </span>
                            </div>
                        </Link>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className="header">
                    <div className="header_logo">
                        <Link to="/">
                            <img src={Img}></img>
                        </Link>
                    </div>
                    <div className="header_search">
                        <span></span>
                    </div>
                    <div className="header_nav">
                        <Link to="/" className="header_link">
                            <div className="header_mainOption">
                                <CreateIcon className="header_orderIcon" />
                                <div className="header_option">
                                    <span className="header_optionLine2">
                                        Sign In
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/signup" className="header_link">
                            <div className="header_mainOption">
                                <HowToRegIcon className="header_orderIcon" />
                                <div className="header_option">
                                    <span className="header_optionLine2">
                                        Sign Up
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </nav>
            );
        }
    }
}
export default withRouter(Header);
