import React from "react";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

export default class CheckoutItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            num_of_items: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const id = this.props.product.id;
        this.setState({
            quantity: this.props.cart[id],
        });
    }

    handleInputChange = (event) =>
        this.setState({ [event.target.name]: event.target.value });

    render() {
        const { product, cart, storeDistances } = this.props;
        return (
            <div className="product_layout">
                <div className="product_details_flexbox1">
                    <img className="product_image" src={product.photo}></img>
                    <div className="product_details_name_type">
                        <div className="product_name">{product.name}</div>
                        <div className="product_type">Type: {product.type}</div>
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
                    </div>
                    <div className="product_details_quantity">
                        <div className="product_quantity">
                            {"Quantity: "}
                            {cart[product.id]}
                            <input
                                className="quantity_input"
                                type="number"
                                value={this.state.quantity}
                                name="quantity"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <Button
                            className="quantity_save_button"
                            variant="contained"
                            color="primary"
                            productID={product.id}
                            onClick={() => {
                                this.props.update(product, this.state.quantity);
                                this.props.update_num_of_items();
                                this.props.update_subtotal();
                            }}
                        >
                            save
                    </Button>
                    </div>
                    <div className="product_details_price">
                        <div className="product_price">
                            ${parseFloat(product.price).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="store_flexbox">
                    <div className="store_details">
                        <div className="store_name">{product.store}</div>
                        <div className="store_address">{product.address}</div>
                        <div className="store_phone">{product.phone}</div>
                        <div className="store_distance">
                            {this.props.convert(storeDistances[product.store])}
                            {" miles away"}
                        </div>
                    </div>
                    <Button
                        className="remove_button"
                        color="primary"
                        productID={product.id}
                        onClick={() => this.props.remove(product)}
                    >
                        Remove
                </Button>
                </div>
            </div>
        );
    }
}
