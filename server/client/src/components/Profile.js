import React, { Component } from "react";
import "./css/Profile.css";
import Header from "./Header";
import Footer from "./Footer";
import PopUpName from "./PopUpName";
import PopUpPhone from "./PopUpPhone";
import PopUpEmail from "./PopUpEmail";
import PopUpAddCard from "./PopUpAddCard";
import PopUpAddAddress from "./PopUpAddAddress";
import PopUpRemoveAddress from "./PopUpRemoveAddress";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AuthenticationService from "./Authentication";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            profile: {},
            addresses: [],
            seenName: false,
            seenPhone: false,
            seenEmail: false,
            seenAddCard: false,
            seenAddAddress: false,
            seenRemoveAddress: false,
        };
    }

    componentWillMount() {
        const profile = JSON.parse(localStorage.getItem("profile")).info[0];
        const addresses = JSON.parse(localStorage.getItem("profile")).addresses;
        this.setState({
            profile: profile,
            addresses: addresses,
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    refresh = () => {
        const user = AuthenticationService.getCurrentUser();
        const currentUser = JSON.parse(localStorage.getItem("user"));
        fetch("/profile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                userEmail: currentUser.email,
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

    togglePopName = () => {
        this.setState({
            seenName: !this.state.seenName,
        });
    };

    togglePopPhone = () => {
        this.setState({
            seenPhone: !this.state.seenPhone,
        });
    };

    togglePopEmail = () => {
        this.setState({
            seenEmail: !this.state.seenEmail,
        });
    };

    togglePopAddCard = () => {
        this.setState({
            seenAddCard: !this.state.seenAddCard,
        });
    };

    togglePopAddAddress = () => {
        this.setState({
            seenAddAddress: !this.state.seenAddAddress,
        });
    };

    togglePopRemoveAddress = () => {
        this.setState({
            seenRemoveAddress: !this.state.seenRemoveAddress,
        });
    };

    updateName = (firstName, lastName) => {
        let profile = JSON.parse(localStorage.getItem("profile"));
        let user = JSON.parse(localStorage.getItem("user"));
        profile.info[0].firstName = firstName;
        profile.info[0].lastName = lastName;
        user.name = firstName;
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("user", JSON.stringify(user));
    };

    updatePhone = (phone) => {
        let profile = JSON.parse(localStorage.getItem("profile"));
        profile.info[0].phone = phone;
        localStorage.setItem("profile", JSON.stringify(profile));
    };

    updateEmail = (email) => {
        let profile = JSON.parse(localStorage.getItem("profile"));
        let user = JSON.parse(localStorage.getItem("user"));
        profile.info[0].email = email;
        user.email = email;
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("user", JSON.stringify(user));
    };

    updateAddress = (address) => {
        console.log("addAddress");
        let profile = JSON.parse(localStorage.getItem("profile"));
        profile.addresses.push(address);
        localStorage.setItem("profile", JSON.stringify(profile));
        this.props.history.push("/profile");
    };

    componentDidMount() {
        const profile = JSON.parse(localStorage.getItem("profile")).info[0];
        const addresses = JSON.parse(localStorage.getItem("profile")).addresses;
        this.setState({
            profile: profile,
            addresses: addresses,
        });
    }

    render() {
        const { addresses, profile } = this.state;
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
                                <h3 className="my_account_heading">
                                    {" "}
                                    My Account
                                </h3>
                            </div>
                            <div className="profile__image"></div>
                            <div className="line">
                                <div className="profile__icon">
                                    <EmojiEmotionsIcon />
                                </div>
                                <div className="profile__block">
                                    <div className="full_name">
                                        {"Full Name:"}
                                    </div>
                                    <div className="profile_name">
                                        {profile.firstName} {profile.lastName}
                                    </div>
                                </div>
                                <div className="profile__editIcon">
                                    <EditIcon onClick={this.togglePopName} />
                                    {this.state.seenName ? (
                                        <PopUpName
                                            toggle={this.togglePopName}
                                            updateStorage={this.updateName}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className="line">
                                <div className="profile__icon">
                                    <PhoneIphoneIcon />
                                </div>
                                <div className="profile__block">
                                    <div className="phone">{"Phone: "}</div>
                                    <div className="profile_phone">
                                        {profile.phone}
                                    </div>
                                </div>
                                <div className="profile__editIcon">
                                    <EditIcon onClick={this.togglePopPhone} />
                                    {this.state.seenPhone ? (
                                        <PopUpPhone
                                            toggle={this.togglePopPhone}
                                            updateStorage={this.updatePhone}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className="line">
                                <div className="profile__icon">
                                    <EmailIcon />
                                </div>
                                <div className="profile__block">
                                    <div className="email">{"Email: "}</div>
                                    <div className="profile_email">
                                        {profile.email}
                                    </div>
                                </div>
                                <div className="profile__editIcon">
                                    <EditIcon onClick={this.togglePopEmail} />
                                    {this.state.seenEmail ? (
                                        <PopUpEmail
                                            toggle={this.togglePopEmail}
                                            updateStorage={this.updateEmail}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="profile__columnRight">
                            <div>
                                <h3 className="delivery_addresses_heading">
                                    Delivery Addresses
                                </h3>
                            </div>
                            {addresses.map((address) => (
                                <div className="line">
                                    <div className="profile__icon">
                                        <HomeOutlinedIcon />
                                    </div>
                                    <div className="profile__block">
                                        <div className="profile_address">
                                            {address.number} {address.street}
                                            {", "}
                                            {address.city}
                                            {", "} {address.zipcode}
                                        </div>
                                    </div>
                                    <div className="profile__icon">
                                        <DeleteForeverIcon
                                            onClick={
                                                this.togglePopRemoveAddress
                                            }
                                        />
                                        {this.state.seenRemoveAddress ? (
                                            <PopUpRemoveAddress
                                                toggle={
                                                    this.togglePopRemoveAddress
                                                }
                                                updateStorage={
                                                    this.removeAddress
                                                }
                                                addressID={address.addressID}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                            <div className="line">
                                <button className="add">
                                    <AddCircleIcon
                                        onClick={this.togglePopAddAddress}
                                    />
                                    {this.state.seenAddAddress ? (
                                        <PopUpAddAddress
                                            toggle={this.togglePopAddAddress}
                                            updateStorage={this.updateAddress}
                                        />
                                    ) : null}
                                </button>
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
