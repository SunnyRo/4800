import { compareSync } from 'bcryptjs';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthenticationService from './Authentication';
import "./css/Profile.css"
import Header from './Header';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            token: '',
        };
    }

    render() {
        const profile = JSON.parse(localStorage.getItem("profile"));
        return (
            <div>
                <Header />
                <div className="profile">
                    <div className="profile__header">
                        My profile
                    </div>
                    <div className="profile__body">
                        <div className="profile__columnLeft">
                            <div>Account</div>
                            <div className="profile__image"></div>
                            <div className="line">
                                <EmojiEmotionsIcon />
                                <div className="profile__block">Full Name: {profile.firstName} {profile.lastName}</div>
                            </div>
                            <div className="line">
                                <PhoneIphoneIcon />
                                <div className="profile__block">Phone: {profile.phone}</div>
                            </div>
                            <div className="line">
                                <EmailIcon />
                                <div className="profile__block">Email: {profile.email}</div>
                            </div>
                        </div>
                        <div className="profile__columnRight">
                            <div className="profile_smallBlock">
                                <div className="line">
                                    <div className="profile__block">Credit Card Number:</div>
                                    <div className="profile__block">{profile.CCnumber}</div>
                                </div>
                                <div className="line">
                                    <div className="profile__block">Name on card:</div>
                                    <div className="profile__block">{profile.fullName}</div>
                                </div>
                                <div className="line">
                                    <div className="profile__block">Expiration Date:</div>
                                    <div className="profile__block">{profile.expirationDate}</div>
                                </div>
                                <div className="line">
                                    <AddCircleIcon><div>Add an address</div></AddCircleIcon>
                                </div>

                            </div>

                            <div className="profile_smallBlock">
                                <div>Delivery Adress</div>
                                <div className="line">
                                    <HomeOutlinedIcon />
                                    <div className="profile__block">{profile.number} {profile.street} {profile.city} {profile.zipcode}</div>
                                </div>
                                <div className="line">
                                    <AddCircleIcon><div>Add an address</div></AddCircleIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixingFooter"></div>
            </div>
        );
    }
}

export default Profile
