import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpRemoveAddress extends Component {
    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    remove = () => {
        const user = AuthenticationService.getCurrentUser();
        let currentUser = JSON.parse(localStorage.getItem("user"));
        fetch("/profile/removeaddress", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                addressID: this.props.addressID,
                customerID: currentUser.customerID,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                }
            });
        this.props.updateStorage("address");
        const profile = JSON.parse(localStorage.getItem("profile")).info[0];
        this.setState({
            profile: profile,
        })
        // this.props.history.push("/profile");
    };

    handleClick = () => {
        this.props.toggle();
    };

    backToProfile = () => {
        this.props.history.push("/profile");
    };

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <form>
                        <h3 className="remove_heading">Are you sure?</h3>
                        <button 
                            className="yes_button"
                            onClick={this.remove}
                        >
                            Yes
                        </button>
                        <button 
                            className="no_button"
                            onClick={this.backToProfile}
                        >
                            No
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
