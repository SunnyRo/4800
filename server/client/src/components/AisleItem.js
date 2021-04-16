import React from "react";
import "./css/Aisle.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";

export default class AisleItem extends React.Component {
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
                <div className="store_name">{product.storename}</div>
                <div className="product_image_container">
                    <img
                        className="product_image"
                        src={product.productphoto}
                    ></img>
                </div>
                <div className="product_details">
                    <div className="product_name">{product.productname}</div>
                    <div className="product_price">${product.unitPrice}</div>
                    <div className="product_type">Type: {product.type}</div>
                    <div className="product_quantity">
                        Currently {product.quantity} in stock!
                    </div>
                </div>
                <div className="store_details">
                    <div className="store_address">{product.address}</div>
                    <div className="store_phone">{product.phone}</div>
                    <div className="store_distance">
                        {this.props.convert(storeDistances[product.storename])}{" "}
                        miles away
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
