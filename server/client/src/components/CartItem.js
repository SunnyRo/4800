import React from "react";
import "./css/Cart.css"
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
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
        const { product, storeDistances, cart } = this.props;
        return (
            <div className="product_layout">
                <div className="store_name">{product.store}</div>
                <div className="product_image_container">
                    <img className="product_image" src={product.photo}></img>
                </div>
                <div className="product_details">
                    <div className="product_name">{product.name}</div>
                    <div>
                        <Box align="left" component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                // value={5}
                                value={product.rating}
                                readOnly={true}
                            />
                            <div className="totalReview">{product.numberofreviews}</div>
                        </Box>
                    </div>
                    <div className="product_price">${product.price}</div>
                    <div className="product_type">Type: {product.type}</div>
                </div>
                <div className="store_details">
                    <div className="store_address">{product.address}</div>
                    <div className="store_phone">{product.phone}</div>
                    <div className="store_distance">
                        {this.props.convert(storeDistances[product.store])}{" "}
                        miles away.
                    </div>
                </div>
                <div className="product_quantity">
                    <div>Quantity : {cart[product.id]}</div>
                    <input
                        type="number"
                        value={this.state.quantity}
                        name="quantity"
                        onChange={this.handleInputChange}
                        className="quantity_input"
                    />
                </div>
                <div className="buttons">
                    <div className="button_item">
                        <Button
                            variant="contained"
                            color="primary"
                            productID={product.id}
                            onClick={() =>
                                this.props.update(product, this.state.quantity)
                            }
                        >
                            save
                        </Button>
                    </div>
                    <div className="button_item">
                        <Button
                            variant="contained"
                            color="primary"
                            productID={product.id}
                            onClick={() => this.props.remove(product)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
