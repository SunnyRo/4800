import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";
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
    update = () => {
        const user = AuthenticationService.getCurrentUser();
        const { firstName, lastName } = this.state
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
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                }
            });
        this.props.updateStorage(firstName, lastName)
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
                        <h3>Edit</h3>
                        <label>
                            First Name:
                            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            Last Name:
                            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                        </label>
                        <br />
                        <input type="submit" onClick={this.update} />
                    </form>
                </div>
            </div>
        );
    }
}