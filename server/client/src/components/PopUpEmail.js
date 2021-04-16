import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    update = () => {
        const user = AuthenticationService.getCurrentUser();
        const { email } = this.state;
        fetch("/profile/updateemail", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                email: email,
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
        this.props.updateStorage(email);
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
                        <div className="heading">Edit Email</div>
                        <label className="label_container">
                            <div className="email">Email:</div>
                            <input
                                className="email_input"
                                type="text"
                                name="email"
                                value={this.state.email}
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
