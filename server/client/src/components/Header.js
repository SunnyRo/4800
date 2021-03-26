import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './css/Header.css';
import Img from './images/Growceries.PNG'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AuthenticationService from "./Authentication";
import CreateIcon from '@material-ui/icons/Create';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Profile from './Profile';
import { useHistory, withRouter } from "react-router-dom";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            isload: false,
            type: "",
            user: "",
            searchterm: ""
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
                "authorization": "Bearer " + user.accesstoken,
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

    }
    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        // window.location.reload();
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        const user = AuthenticationService.getCurrentUser();
        if (this.state.type === '') {
            fetch("/search/products", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + user.accesstoken,
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
                        const empty = []
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
                    "authorization": "Bearer " + user.accesstoken,
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
                        const empty = []
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
        if (user && type) {
            return (
                <nav className="header" >
                    <div className="header__logo">
                        <Link to="/">
                            <img src={Img}></img>
                        </Link>
                    </div>
                    <div className="header__location">
                        <LocationOnIcon />
                        <span>{user.address}</span>
                    </div>
                    <form className="header__search">
                        <select className="header__searchCategory" type="type" name="type" value={this.state.type} onChange={this.handleChange}>
                            <option value="">&nbsp;&nbsp;&nbsp;All</option>
                            {type.map((type) => (
                                <option value={type.type}>{type.type}</option>
                            ))}
                        </select>
                        <input type="searchterm" name="searchterm" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} value={this.state.searchterm} onChange={this.handleChange} className="header__searchInput"></input>
                        <SearchIcon onClick={this.handleSubmit} type="submit" value="Submit" className="header__searchIcon"></SearchIcon>
                    </form>
                    <div className="header__nav">
                        {/* 1st Link */}
                        <Link onClick={this.getProfile} className="header__link">
                            <div className="header__mainOption">
                                <AccountBoxIcon className="header_accountIcon" />
                                <div className="header__option">
                                    <span className="header__optionLine1">Hello</span>
                                    <span className="header__optionLine2">{user.name}</span>
                                </div>
                            </div>
                        </Link>
                        {/* 3rd Link */}
                        <Link to="/home/stores" className="header__link">
                            <div className="header__mainOption">
                                <ShoppingCartIcon className="header__cartIcon" />
                                <div className="header__cartCount">
                                    <span className="header__optionLine1">0</span>
                                    <span className="header__optionLine2">Cart</span>
                                </div>
                            </div>
                        </Link>
                        {/* 2nd Link */}
                        <Link to="/home/stores" className="header__link">
                            <div className="header__mainOption">
                                <ReceiptIcon className="header__orderIcon" />
                                <div className="header__option">
                                    <span className="header__optionLine1">returns</span>
                                    <span className="header__optionLine2">orders</span>
                                </div>
                            </div>
                        </Link>
                        {/* 4th Link */}
                        <Link to="/" onClick={this.logout} className="header__link">
                            <div className="header__option">
                                <span className="header__optionLine1">Done</span>
                                <span className="header__optionLine2">Logout</span>
                            </div>
                        </Link>
                    </div>
                </nav >
            );
        } else {
            return (
                <nav className="header" >
                    <div className="header__logo">
                        <Link to="/">
                            <img src={Img}></img>
                        </Link>
                    </div>
                    <div className="header__search">
                        <span></span>
                    </div>
                    <div className="header__nav">
                        <Link to="/" className="header__link">
                            <div className="header__mainOption">
                                <CreateIcon className="header__orderIcon" />
                                <div className="header__option">
                                    <span className="header__optionLine2">Sign In</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/signup" className="header__link">
                            <div className="header__mainOption">
                                <HowToRegIcon className="header__orderIcon" />
                                <div className="header__option">
                                    <span className="header__optionLine2">Sign Up</span>
                                </div>
                            </div>
                        </Link>

                    </div>
                </nav>
            );
        }
    };
}
export default withRouter(Header)