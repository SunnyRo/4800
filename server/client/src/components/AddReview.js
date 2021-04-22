import React, { Component, useState } from "react";
import "./css/AddReview.css";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import AuthenticationService from "./Authentication";

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            title: "",
            body: "",
            customerID: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    handleClick = () => {
        this.props.toggle();
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state.rating);
    }

    handleRatingChange(event) {
        this.setState({
            rating: event.target.value,
        });
    }

    onClickSubmit() {
        let customerID = JSON.parse(localStorage.getItem("user")).customerID;
        let product = JSON.parse(localStorage.getItem("product"));
        let currentDate = new Date();
        let datetime =
            currentDate.getFullYear() +
            "-" +
            (currentDate.getMonth() + 1) +
            "-" +
            currentDate.getDate();
        const user = AuthenticationService.getCurrentUser();
        console.log(this.state.rating);
        console.log(this.state.title);
        console.log(this.state.body);
        console.log(datetime);
        console.log(JSON.parse(localStorage.getItem("productID")));
        console.log(customerID);

        fetch("/review/add", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                customerID: customerID,
                productID: product.productID,
                title: this.state.title,
                body: this.state.body,
                datetime: datetime,
                rating: this.state.rating,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                } else {
                    alert(json.message);
                }
            });
            this.props.toggle();
    }

    render() {
        const product = JSON.parse(localStorage.getItem("product"));
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <form>
                        <div className="heading">{"Add review for "}{product.productname}</div>
                        <div className="rating_container">
                            <Box
                                className="rating_box"
                                component="fieldset"
                                mb={3}
                                borderColor="transparent"
                            >
                                <Rating
                                    initialRating={this.state.rating}
                                    value={this.state.rating}
                                    onChange={this.handleRatingChange}
                                />
                            </Box>
                        </div>
                        <label className="label_container">
                            <div className="title_text">Title:</div>
                            <input
                                className="title_input"
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <label className="label_container">
                            <div className="body_text">Body:</div>
                            <textarea
                                className="body_input"
                                type="text"
                                name="body"
                                value={this.state.body}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <Button onClick={this.onClickSubmit}>Submit</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddReview;
