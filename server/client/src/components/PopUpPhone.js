import React, { Component } from "react";
import { toast } from "react-toastify";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    update = (event) => {
        // Regex to test for number input
        const number_re = /^[0-9\b]+$/;

        const user = AuthenticationService.getCurrentUser();
        const { phone } = this.state;

        if (number_re.test(phone)) {
            if (phone.length == 10) {
                fetch("/profile/updatephone", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        authorization: "Bearer " + user.accesstoken,
                    },
                    body: JSON.stringify({
                        phone: phone,
                        user: user.email,
                    }),
                })
                    .then((Response) => Response.json())
                    .then((json) => {
                        if (json.error === "TokenExpiredError") {
                            console.log(json.error);
                            localStorage.clear();
                            this.props.history.push("/");
                        } else {
                            toast.success("Phone number successfully changed!");
                        }
                    });
                this.props.updateStorage(phone);
            } else {
                event.preventDefault();
                toast.error("Please enter a valid phone number!");
            }
        } else {
            event.preventDefault();
            toast.error("Please enter a valid phone number!");
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
                        <div className="heading">Edit Phone</div>
                        <label className="label_container">
                            <div className="phone">Phone:</div>
                            <input
                                className="phone_input"
                                type="text"
                                required
                                name="phone"
                                value={this.state.phone}
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
