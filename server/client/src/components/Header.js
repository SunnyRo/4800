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
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            isload: false,
        };
        this.logout = this.logout.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }
    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        // window.location.reload();
    };

    getProfile = (event) => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            fetch("/profile", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + user.accesstoken,
                },
            })
                .then((Response) => Response.json())
                .then((json) => {
                    if (json.error === "TokenExpiredError") {
                        console.log(json.error);
                        localStorage.clear();
                        this.props.history.push("/");
                    } else {
                        console.log(json);
                        localStorage.setItem("profile", JSON.stringify(json));
                        // this.props.history.push("/profile");
                    }

                });
        } else {
            this.props.history.push("/");
        }
    };
    render() {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            return (
                <nav className="header" >
                    <div className="header__logo">
                        <Link to="/">
                            <img src={Img}></img>
                        </Link>
                    </div>
                    <div className="header__location">
                        <LocationOnIcon />
                        <span>Location</span>
                    </div>
                    <div className="header__search">
                        <input type="text" className="header__searchInput"></input>
                        <SearchIcon className="header__searchIcon"></SearchIcon>
                    </div>
                    <div className="header__nav">
                        {/* 1st Link */}
                        <Link to="/profile" onClick={this.getProfile} className="header__link">
                            <div className="header__mainOption">
                                <AccountBoxIcon className="header_accountIcon" />
                                <div className="header__option">
                                    <span className="header__optionLine1">Hello</span>
                                    <span className="header__optionLine2">account</span>
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
                </nav>
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
export default Header