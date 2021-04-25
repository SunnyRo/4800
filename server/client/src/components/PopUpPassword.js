import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
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
            toast.error("Passwords do not match! Please try again.");
        } else {
            fetch("/profile/updatepassword", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({
                    password: password,
                    email: user.email,
                }),
            })
                .then((Response) => Response.json())
                .then((json) => {
                    if (json.error === "TokenExpiredError") {
                        console.log(json.error);
                        localStorage.clear();
                        this.props.history.push("/");
                    }
                    toast.success(json.message);
                    this.props.toggle();
                });
        }
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
                    {/* <form> */}
                    <div className="heading">Edit Password</div>
                    <label className="label_container">
                        <div className="password">Password:</div>
                        <input
                            className="password_input"
                            type="password"
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
                            type="password"
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
                    {/* </form> */}
                </div>
            </div>
        );
    }
}
