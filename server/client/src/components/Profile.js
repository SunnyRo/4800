import React, { Component } from "react";
import "./css/Profile.css";
import Header from "./Header";
import Footer from "./Footer";
import PopUpName from "./PopUpName";
import PopUpPhone from "./PopUpPhone";
import PopUpEmail from "./PopUpEmail";
import PopUpPassword from "./PopUpPassword";
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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
            seenPassword: false,
            image: null,
            imagePath: null,
            imageName: null,
        };
    }

    componentWillMount() {
        const profile = JSON.parse(localStorage.getItem("profile")).info[0];
        const addresses = JSON.parse(localStorage.getItem("profile")).addresses;
        let image = JSON.parse(localStorage.getItem("user")).image;
        if (image == '/null') {
            image = '/default.jpeg'
        }
        this.setState({
            profile: profile,
            addresses: addresses,
            imagePath: image,
        });
        this.forceUpdate();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

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

    togglePopRemoveAddress = (addressID) => {
        this.setState({
            seenRemoveAddress: !this.state.seenRemoveAddress,
        });
        localStorage.setItem("clickedAddress", JSON.stringify(addressID));
    };

    togglePopPassword = () => {
        this.setState({
            seenPassword: !this.state.seenPassword,
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

    updateAddress = (address, logic) => {
        console.log("addAddress");
        console.log(address);
        if (logic) {
            let profile = JSON.parse(localStorage.getItem("profile")).info[0];
            let addresses = JSON.parse(localStorage.getItem("profile"))
                .addresses;
            let newProfile = {};
            let newInfo = [];
            addresses.push(address);
            newInfo.push(profile);
            newProfile["info"] = newInfo;
            newProfile["addresses"] = addresses;
            console.log("newprofile : " + newProfile.info[0]);
            localStorage.setItem("profile", JSON.stringify(newProfile));
            this.setState({
                profile: profile,
                addresses: addresses,
            });
        } else {
            let array = JSON.parse(localStorage.getItem("profile")).addresses;
            let profile = JSON.parse(localStorage.getItem("profile")).info[0];
            const addresses = array.filter(
                (item) => item.addressID !== address
            );

            let newProfile = {};
            let newInfo = [];
            newInfo.push(profile);
            newProfile["info"] = newInfo;
            newProfile["addresses"] = addresses;
            localStorage.setItem("profile", JSON.stringify(newProfile));
            this.setState({
                profile: profile,
                addresses: addresses,
            });
        }
        this.forceUpdate();
    };

    clickedAdress = (addressID) => {
        localStorage.setItem("clickedAdress", JSON.stringify(addressID));
    };

    updateImage = async (e) => {
        console.log(e.target.files[0]);
        const user = AuthenticationService.getCurrentUser();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("customerID", user.customerID);
        const res = await axios.post("/profile/updateimage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(res.data);
        this.setState({
            imageName: res.data.fileName,
            imagePath: res.data.filePath,
        });
    };

    render() {
        const { addresses, profile, image, imageName, imagePath } = this.state;

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
                            <label
                                for="image_upload"
                                class="image__upload__label"
                            >
                                <AddCircleOutlineIcon />
                            </label>
                            <input
                                class="upload"
                                id="image_upload"
                                type="file"
                                onChange={this.updateImage}
                            />
                            <div className="profile__image__container">
                                <img
                                    className="profile__image"
                                    style={{ width: "100%" }}
                                    src={imagePath}
                                    alt=""
                                />
                            </div>
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
                            <div className="line">
                                <div className="profile__block__password">
                                    <div className="profile__editIcon">
                                        <Link
                                            className="edit_password"
                                            onClick={this.togglePopPassword}
                                        >
                                            Edit your password
                                        </Link>
                                        {this.state.seenPassword ? (
                                            <PopUpPassword
                                                toggle={this.togglePopPassword}
                                                updateStorage={
                                                    this.updatePassword
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__columnRight">
                            <div>
                                <h3 className="delivery_addresses_heading">
                                    Delivery Addresses
                                </h3>
                            </div>
                            {addresses.map((address, index) => (
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
                                            onClick={() =>
                                                this.togglePopRemoveAddress(
                                                    address.addressID
                                                )
                                            }
                                        />
                                        {this.state.seenRemoveAddress ? (
                                            <PopUpRemoveAddress
                                                toggle={
                                                    this.togglePopRemoveAddress
                                                }
                                                updateStorage={
                                                    this.updateAddress
                                                }
                                                key={index}
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
