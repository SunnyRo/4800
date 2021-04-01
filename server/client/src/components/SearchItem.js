import React from 'react';
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
export default class SearchItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            cart: {}
        }
    }
    addToCart = (event) => {
        console.log("Add to cart")
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        let id = this.props.product.productID.toString();
        if (cart[id]) {
            cart[id] = cart[id]
        } else {
            cart[id] = 0

            let cartInfo = localStorage.getItem('cartInfo') ? JSON.parse(localStorage.getItem('cartInfo')) : [];
            let item = {
                'id': id,
                'name': this.props.product.productname,
                'price': this.props.product.unitPrice,
                'type': this.props.product.type,
                'photo': this.props.product.productphoto,
                'address': this.props.product.address,
                'phone': this.props.product.phone,
                'store': this.props.product.storename,
            };
            cartInfo.push(item);
            localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
        }
        let quantity = cart[id] + parseInt(this.state.quantity);
        if (this.props.product.quantity < quantity) {
            cart[id] = this.props.product.quantity;
        } else {
            cart[id] = quantity
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.props.remove()
    }
    handleInputChange = event => this.setState({ [event.target.name]: event.target.value })
    render() {
        const { product, storeDistances } = this.props;
        return (
            <div className="product_layout">
                <div className="store_name">
                    {product.storename}
                </div>
                <div className="product_image_container">
                    <img
                        className="product_image"
                        src={product.productphoto}
                    ></img>
                </div>
                <div className="product_details">
                    <div className="product_name">
                        {product.productname}
                    </div>
                    <div className="product_price">
                        ${product.unitPrice}
                    </div>
                    <div className="product_type">
                        Type: {product.type}
                    </div>
                    <div className="product_quantity">
                        Currently {product.quantity} in stock!
                    </div>
                </div>
                <div className="store_details">
                    <div className="store_address">
                        {product.address}
                    </div>
                    <div className="store_phone">
                        {product.phone}
                    </div>
                    <div className="store_distance">
                        {storeDistances[product.storename]} away.
                                                </div>
                </div>
                {parseInt(product.quantity, 10) > 0 ?
                    <div className="addtocart_div">

                        <Button
                            className="add_to_cart_button"
                            variant="contained"
                            color="primary"
                            onClick={this.addToCart}
                        >
                            Add to Cart
                                                    </Button>
                        <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="quantity_input" />
                    </div> :
                    <div className="text-danger">Product is out of stock</div>
                }
            </div>
        )
    }
}