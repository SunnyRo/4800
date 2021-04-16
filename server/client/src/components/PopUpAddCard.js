import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpAddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            expirationDate: "",
            validationCode: "",
            CCnumber: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    update = () => {
        console.log("pop add card update function");
        const user = AuthenticationService.getCurrentUser();
        const {
            fullName,
            expirationDate,
            validationCode,
            CCnumber,
        } = this.state;
        let currentUser = JSON.parse(localStorage.getItem("user"));
        console.log(currentUser.customerID);
        fetch("/profile/addcard", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                fullName: fullName,
                expirationDate: expirationDate,
                validationCode: validationCode,
                CCnumber: CCnumber,
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
                const card = {
                    fullName: fullName,
                    expirationDate: expirationDate,
                    CCnumber: CCnumber,
                };
                this.props.updateStorage(card);
            });
    };

    handleClick = () => {
        this.props.toggle();
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <form>
                        <h3>Add a Card</h3>
                        <label>
                            CCnumber:
                            <input
                                type="text"
                                name="CCnumber"
                                value={this.state.CCnumber}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            expirationDate:
                            <input
                                type="text"
                                name="expirationDate"
                                value={this.state.expirationDate}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            fullName:
                            <input
                                type="text"
                                name="fullName"
                                value={this.state.fullName}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label>
                            validationCode:
                            <input
                                type="text"
                                name="validationCode"
                                value={this.state.validationCode}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <input
                            className="submit_input"
                            type="submit"
                            onClick={this.update}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
