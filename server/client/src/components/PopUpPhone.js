import React, { Component } from "react";
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
    update = () => {
        const user = AuthenticationService.getCurrentUser();
        const { phone } = this.state
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
                }
            });
        this.props.updateStorage(phone)
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
                        <h3>Edit Phone</h3>
                        <label>
                            Phone:
                            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
                        </label>
                        <br />
                        <input type="submit" onClick={this.update} />
                    </form>
                </div>
            </div>
        );
    }
}