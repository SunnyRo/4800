import React, { Component } from "react";
import "./css/ProductReviews.css";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import Footer from "./Footer";

class ProductReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log("Load ProductReviews page");
    }

    render() {
        const product_review = JSON.parse(
            localStorage.getItem("productReviews")
        );

        return (
            <div className="product_reviews">
                <Header />
                <div className="heading_container">
                    <div className="main_heading">
                        {"Customer reviews of "}
                        {product_review[0].productname}
                    </div>
                    <img
                        className="product_image"
                        src={product_review[0].photo}
                    />
                    <div className="store">
                        {"Sold by "}
                        {product_review[0].storename}
                    </div>
                    <div className="rating_container">
                        <Box
                            className="rating_box"
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                        >
                            <Rating
                                // value={5}
                                value={product_review[0].averageRating}
                                readOnly={true}
                            />
                            <div className="number_of_reviews">
                                {product_review[0].numberofreviews}
                                {" ratings"}
                            </div>
                        </Box>
                        <div className="average_rating">
                            {product_review[0].averageRating}
                            {" out of 5"}
                        </div>
                    </div>
                </div>
                <div className="read_reviews">
                    Read reviews from fellow customers
                </div>
                <div className="ratings_list_container">
                    {product_review.map((review) => (
                        <li className="ratings_list" key={review.id}>
                            <div className="review_container">
                                <Box
                                    className="rating_box"
                                    component="fieldset"
                                    mb={3}
                                    borderColor="transparent"
                                >
                                    <Rating
                                        value={review.rating}
                                        readOnly={true}
                                    />
                                </Box>
                                <div className="review_title">
                                    {review.title}
                                </div>
                                <div className="by_text">{" by"}</div>
                                <div className="review_name">
                                    {review.firstName}{" "}{review.lastName}
                                </div>
                            </div>
                            <div className="review_date">
                                {"Reviewed on "}{review.datetime.slice(0, 10)}
                            </div>
                            <div className="review_body">{review.body}</div>
                        </li>
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}

export default ProductReviews;
