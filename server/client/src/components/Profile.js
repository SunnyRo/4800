import { compareSync } from "bcryptjs";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./Authentication";
import "./css/Profile.css";
import Header from "./Header";
import Footer from "./Footer";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            token: "",
        };
    }

    render() {
        const profile = JSON.parse(localStorage.getItem("profile"));
        return (
            <div>
                <Header />
                <div className="background"></div>
                <div className="profile">
                    <div className="profile__header">
                        <h2>{profile.firstName}'s Profile</h2>
                    </div>
                    <div className="profile__body">
                        <div className="profile__columnLeft">
                            <div>
                                <h3> My Account</h3>
                            </div>
                            <div className="profile__image"></div>
                            <div className="line">
                                <EmojiEmotionsIcon />
                                <div className="profile__block">
                                    Full Name: {profile.firstName}{" "}
                                    {profile.lastName}
                                </div>
                                <button className="edit">
                                    <EditIcon />
                                </button>
                            </div>
                            <div className="line">
                                <PhoneIphoneIcon />
                                <div className="profile__block">
                                    Phone: {profile.phone}
                                </div>
                                <button className="edit">
                                    <EditIcon />
                                </button>
                            </div>
                            <div className="line">
                                <EmailIcon />
                                <div className="profile__block">
                                    Email: {profile.email}
                                </div>
                                <button className="edit">
                                    <EditIcon />
                                </button>
                            </div>
                        </div>
                        <div className="profile__columnRight">
                            <div className="profile_smallBlock">
                                <div className="line">
                                    <div className="profile__block">
                                        Credit Card Number:
                                    </div>
                                    <div className="profile__block">
                                        {profile.CCnumber}
                                    </div>
                                    <button className="edit">
                                        <EditIcon />
                                    </button>
                                </div>
                                <div className="line">
                                    <div className="profile__block">
                                        Name on card:
                                    </div>
                                    <div className="profile__block">
                                        {profile.fullName}
                                    </div>
                                    <button className="edit">
                                        <EditIcon />
                                    </button>
                                </div>
                                <div className="line">
                                    <div className="profile__block">
                                        Expiration Date:
                                    </div>
                                    <div className="profile__block">
                                        {profile.expirationDate}
                                    </div>
                                    <button className="edit">
                                        <EditIcon />
                                    </button>
                                </div>
                                <div className="line">
                                    <button className="add">
                                        <AddCircleIcon>
                                            <div>Add a credit card</div>
                                        </AddCircleIcon>
                                    </button>
                                </div>
                            </div>

                            <div className="profile_smallBlock">
                                <div>Delivery Address</div>
                                <div className="line">
                                    <HomeOutlinedIcon />
                                    <div className="profile__block">
                                        {profile.number} {profile.street}{" "}
                                        {profile.city} {profile.zipcode}
                                    </div>
                                </div>
                                <div className="line">
                                    <button className="add">
                                        <AddCircleIcon>
                                            <div>Add an address</div>
                                        </AddCircleIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixingFooter"></div>
                <Footer />
            </div>
        );
    }
}

export default Profile;
