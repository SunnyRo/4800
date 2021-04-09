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
    };
    handleClick = () => {
        this.props.toggle();
    };
    backToProfile = () => {
        this.props.history.push("/profile")
    }
    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <form>
                        <h3>Are you sure?</h3>
                        <button onClick={this.remove}>Yes</button>
                        <button onClick={this.backToProfile}>No</button>
                    </form>
                </div>
            </div>
        );
    }
}