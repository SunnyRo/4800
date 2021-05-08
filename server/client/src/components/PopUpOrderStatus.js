import React, { Component } from "react";
import { toast } from "react-toastify";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpOrderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderstatus: null,
            status: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }
    componentWillMount() {
        const orderstatus = JSON.parse(localStorage.getItem("orderstatus"));
        // const orderstatus = AuthenticationService.getCurrentUser(orderstatus);
        this.setState({
            orderstatus: orderstatus,
        })
    }


    update = () => {
        const user = AuthenticationService.getCurrentUser();
        const { status, orderstatus } = this.state;
        fetch("/staff/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                status: status,
                orderID: orderstatus.orderID,
                email: orderstatus.email,
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
        const { orderstatus } = this.state
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <form>
                        <div className="heading">Update status for order#{orderstatus.orderID}</div>
                        <label className="label_container">
                            <div className="phone">status:</div>
                            <input
                                className="phone_input"
                                type="text"
                                required
                                name="status"
                                value={this.state.status}
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
