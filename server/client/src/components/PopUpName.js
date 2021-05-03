import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class PopUpName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    update = (event) => {
        // Regex to test for string input
        const string_re = /^[A-Za-z\s]*$/;
        let isCorrect = true;

        const user = AuthenticationService.getCurrentUser();
        const { firstName, lastName } = this.state;

        if (string_re.test(firstName)) {
            if (string_re.test(lastName)) {
                fetch("/profile/updatename", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        authorization: "Bearer " + user.accesstoken,
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        user: user.email,
                    }),
                })
                    .then((Response) => Response.json())
                    .then((json) => {
                        if (json.token) {
                            console.log(json.error);
                            localStorage.clear();
                            this.props.history.push("/");
                        } else {
                            toast.success("Name successfully changed!");
                        }
                    });
                this.props.updateStorage(firstName, lastName);
            } else {
                event.preventDefault();
                toast.error("Please enter a valid last name!");
            }
        } else {
            event.preventDefault();
            toast.error("Please enter a valid first name!");
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
                    <form>
                        <div className="heading">Edit Name</div>
                        <label className="label_container">
                            <div className="first_name">First Name:</div>
                            <input
                                className="first_name_input"
                                type="text"
                                name="firstName"
                                required
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br></br>
                        <label className="label_container">
                            <div className="last_name">Last Name:</div>
                            <input
                                className="last_name_input"
                                type="text"
                                name="lastName"
                                required
                                value={this.state.lastName}
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
