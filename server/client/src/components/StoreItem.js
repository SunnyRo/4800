import React from "react";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

export default class StoreItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        };
    }

    handleInputChange = (event) =>
        this.setState({ [event.target.name]: event.target.value });

    render() {
        const { product, storeDistances } = this.props;

        return (
            <div className="product_layout">
                <div className="product_image_container">
                    <img
                        className="product_image"
                        src={product.productphoto}
                    ></img>
                </div>
                <div className="product_details">
                    <div className="product_name">{product.productname}</div>
                    <div className="rating_container">
                        <Box
                            className="rating_box"
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                        >
                            <Rating
                                // value={5}
                                value={product.rating}
                                readOnly={true}
                            />
                        </Box>
                        <Link onClick={() => this.props.getReviews(product)}>
                            <div className="total_review">
                                {product.numberofreviews}
                                {" ratings"}
                            </div>
                        </Link>
                    </div>
                    <div className="product_price">${product.unitPrice}</div>
                    <div className="product_type">Type: {product.type}</div>
                    <div className="product_quantity">
                        Currently {product.quantity} in stock!
                    </div>
                </div>

                {parseInt(product.quantity, 10) > 0 ? (
                    <div className="addtocart_div">
                        <Button
                            className="add_to_cart_button"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                this.props.addToCart(
                                    product,
                                    this.state.quantity
                                )
                            }
                        >
                            Add to Cart
                        </Button>
                        <input
                            type="number"
                            value={this.state.quantity}
                            name="quantity"
                            onChange={this.handleInputChange}
                            className="quantity_input"
                        />
                    </div>
                ) : (
                    <div className="text-danger">Product is out of stock</div>
                )}
            </div>
        );
    }
}
