import React from 'react';
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
export default class CartItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            cart: {}
        }
    }
    componentWillMount() {
        const id = this.props.product.id
        this.setState({
            quantity: this.props.cart[id]
        })
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    removeFromCart = () => {
        const productID = this.props.product.id;
        console.log(productID)
        let cart = JSON.parse(localStorage.getItem('cart'));
        let cartInfo = JSON.parse(localStorage.getItem('cartInfo'));
        const filteredItems = cartInfo.filter(item => item.id !== productID)
        delete cart[productID];
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartInfo', JSON.stringify(filteredItems));
        this.props.update()
    }
    handleInputChange = event => this.setState({ [event.target.name]: event.target.value })
    updateCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        const productID = this.props.product.id;
        console.log(cart[productID])
        const quantity = parseInt(this.state.quantity)
        cart[productID] = quantity
        localStorage.setItem('cart', JSON.stringify(cart));
        this.props.update()
    }
    render() {
        const { product, storeDistances } = this.props;
        return (
            <div className="product_layout">
                <div className="store_name">
                    {product.store}
                </div>
                <div className="product_image_container">
                    <img
                        className="product_image"
                        src={product.photo}
                    ></img>
                </div>
                <div className="product_details">
                    <div className="product_name">
                        {product.name}
                    </div>
                    <div className="product_price">
                        ${product.price}
                    </div>
                    <div className="product_type">
                        Type: {product.type}
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
                        {this.props.convert(storeDistances[product.store])} miles away.
                    </div>
                </div>
                <div className="product_quantity">
                    <div>Quantity</div>
                    <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="quantity_input" />
                </div>
                <div className="buttons">
                    <div className="button_item">
                        <Button
                            variant="contained"
                            color="primary"
                            productID={product.id}
                            onClick={this.updateCart}
                        >save
                    </Button>
                    </div>
                    <div className="button_item">
                        <Button
                            variant="contained"
                            color="primary"
                            productID={product.id}
                            onClick={this.removeFromCart}
                        >Remove
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}
