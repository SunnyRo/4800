import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirm_password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    update = () => {
        const user = AuthenticationService.getCurrentUser();
        const { password, confirm_password } = this.state;
        if (password !== confirm_password) {
            alert("Passwords do not match! Please try again.");
        } else {
            console.log(password);
            fetch("/profile/updateemail", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({
                    password: password,
                    user: user.email,
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
            this.props.updateStorage(password);
            alert("Password successfully changed!");
        }
    };

    handleClick = () => {
        this.props.toggle();
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state.password);
        console.log(this.state.confirm_password);
    }

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <form>
                        <div className="heading">Edit Password</div>
                        <label className="label_container">
                            <div className="password">Password:</div>
                            <input
                                className="password_input"
                                type="text"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label className="label_container">
                            <div className="confirm_password">
                                Confirm Password:
                            </div>
                            <input
                                className="confirm_password_input"
                                type="text"
                                name="confirm_password"
                                value={this.state.confirm_password}
                                onChange={this.handleChange}
                            />
                        </label>
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
