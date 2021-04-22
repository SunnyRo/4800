import React, { Component } from "react";
import AuthenticationService from "./Authentication";
import "./css/PopUp.css";

export default class PopUpAddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            street: "",
            city: "",
            zipcode: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    };

    update = () => {
        const user = AuthenticationService.getCurrentUser();
        const { number, street, city, zipcode } = this.state;
        let currentUser = JSON.parse(localStorage.getItem("user"));
        fetch("/profile/addaddress", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                number: number,
                street: street,
                city: city,
                zipcode: zipcode,
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
                const address = json[1][0]
                this.props.updateStorage(address, true);
                this.props.toggle();
            });
    };

    handleClick = () => {
        this.props.toggle();
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    {/* <form> */}
                    <div className="heading">Add Address</div>
                    <label className="label_container">
                        <div className="street_number">Number:</div>
                        <input
                            className="street_number_input"
                            type="text"
                            name="number"
                            value={this.state.number}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label className="label_container">
                        <div className="street">Street:</div>
                        <input
                            className="street_input"
                            type="text"
                            name="street"
                            value={this.state.street}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label className="label_container">
                        <div className="city">City:</div>
                        <input
                            className="city_input"
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label className="label_container">
                        <div className="zipcode">Zipcode:</div>
                        <input
                            className="zip_input"
                            type="text"
                            name="zipcode"
                            value={this.state.zipcode}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <input
                        className="submit_input"
                        type="submit"
                        onClick={this.update}
                    />
                    {/* </form> */}
                </div>
            </div >
        );
    }
}
