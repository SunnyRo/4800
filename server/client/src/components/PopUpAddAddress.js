import React, { Component } from "react";
import { toast } from "react-toastify";
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
    }

    update = (event) => {
        // Regex to test for string input
        const string_re = /^[A-Za-z\s]*$/;
        // Regex to test for number input
        const number_re = /^[0-9\b]+$/;

        const user = AuthenticationService.getCurrentUser();
        const { number, street, city, zipcode } = this.state;
        let currentUser = JSON.parse(localStorage.getItem("user"));

        if (number_re.test(number)) {
            if (string_re.test(street)) {
                if (string_re.test(city)) {
                    if (number_re.test(zipcode)) {
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
                                const address = json[1][0];
                                this.props.updateStorage(address, true);
                                this.props.toggle();
                            });
                    } else {
                        event.preventDefault();
                        toast.error("Please enter a valid zipcode!");
                    }
                } else {
                    event.preventDefault();
                    toast.error("Please enter a valid city!");
                }
            } else {
                event.preventDefault();
                toast.error("Please enter a valid street!");
            }
        } else {
            event.preventDefault();
            toast.error("Please enter a valid street number!");
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
                    <div className="heading">Add Address</div>
                    <label className="label_container">
                        <div className="street_number">Number:</div>
                        <input
                            className="street_number_input"
                            type="text"
                            required
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
                            required
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
                            required
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
                            required
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
            </div>
        );
    }
}
