import { React, Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import {
    Button,
    createMuiTheme,
    ThemeProvider,
    TextField,
} from "@material-ui/core";
import "./css/Checkout.css";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import CheckoutItem from "./CheckoutItem";
import AuthenticationService from "./Authentication";
// google API
import { DistanceMatrixService } from "@react-google-maps/api";
import Geocode from "react-geocode";
Geocode.enableDebug();
Geocode.setApiKey("AIzaSyDUENlRwq9j2Zgz9NUIxHHFN9cnUa7SuBk");

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#06C167",
        },
        secondary: {
            main: "#06C167",
        },
        background: {
            main: "#06C167",
        },
    },
});

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            addressID: null,
            cart: {},
            total: 0,
            storeDistances: {},
            quantity: "",
            cc_number: "",
            cc_name: "",
            cc_cvv_number: "",
            cc_month: "",
            cc_year: "",
            num_of_items: 0,
            subtotal: 0.0,
            delivery_fees: 0.0,
            cart: [],
            cartInfo: {},
            profile: {},
            delivery_rate: 0.1,
            coordinate: [],
        };
        this.backtoCart = this.backtoCart.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.calc_num_of_items = this.calc_num_of_items.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.calc_subtotal = this.calc_subtotal.bind(this);
        this.calc_delivery_fees = this.calc_delivery_fees.bind(this);
        this.handleDeliveryRateChange = this.handleDeliveryRateChange.bind(
            this
        );
        this.getCoordinate = this.getCoordinate.bind(this);
        this.getReviews = this.getReviews.bind(this);
    }
    getCoordinate = (address) => {
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const coordinate = [`${lat},${lng}`];
                this.setState({
                    coordinate: coordinate,
                });
                setTimeout(() => {
                    const distances = JSON.parse(localStorage.getItem("distances"));
                    const names = [
                        "Walmart",
                        "Whole Foods",
                        "Trader Joe's",
                        "Ralphs",
                        "Vons",
                        "Costco",
                        "Safeway",
                        "Albertsons",
                    ];
                    const storeDistances = {};
                    console.log(distances.rows[0].elements[0].distance.text);
                    distances.rows[0].elements.forEach((element, i) => {
                        storeDistances[names[i]] = element.distance.text;
                    });
                    localStorage.setItem(
                        "storeDistances",
                        JSON.stringify(storeDistances)
                    );
                    this.setState({
                        storeDistances: storeDistances,
                    })
                    this.calc_delivery_fees();
                }, 2000);
            },

        );
    }

    removeFromCart = (product) => {
        const productID = product.id;
        console.log(productID);
        let cart = JSON.parse(localStorage.getItem("cart"));
        let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const filteredItems = cartInfo.filter((item) => item.id !== productID);
        delete cart[productID];
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartInfo", JSON.stringify(filteredItems));
        this.setState({
            cart: cart,
            cartInfo: filteredItems,
        });
        this.calc_num_of_items();
        this.calc_subtotal();
        this.calc_delivery_fees();
    };

    backtoCart(event) {
        this.props.history.push("/cart");
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleDeliveryRateChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        this.calc_delivery_fees();
    }

    updateCart = (product, quantity) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const productID = product.id;
        console.log(cart[productID]);
        cart[productID] = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({
            cart: cart,
        });
    };

    calc_num_of_items = () => {
        var num = 0;
        const cart_info = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart_info.forEach((product, i) => {
            num = num + parseInt(cart[product.id]);
        });
        this.setState({
            num_of_items: num,
        });
    };

    calc_subtotal = () => {
        var num = 0.0;
        const cart_info = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart_info.forEach((product, i) => {
            num = num + parseFloat(cart_info[i].price * cart[product.id]);
        });
        this.setState({
            subtotal: num,
        });
    };

    calc_delivery_fees = () => {
        var num = 0.0;
        let store_names = [];
        const cart_info = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        cart_info.forEach((product) => {
            if (!store_names.includes(product.store))
                store_names.push(product.store);
        });
        store_names.forEach((store, i) => {
            num = num + parseFloat(storeDistances[store]) * 0.621371;
        });
        console.log("delivery fees before", num)
        num = num * this.state.delivery_rate;
        this.setState({
            delivery_fees: num,
        });
        console.log("calc delivery fees", storeDistances)
        console.log('delivery fees', num)
        this.forceUpdate();
    };

    convertDistance = (distance) => {
        const floatDistance = parseFloat(distance);
        const result = (floatDistance * 0.621371).toFixed(2);
        return result;
    };

    updateCart = (product, quantity) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const productID = product.id;
        console.log(cart[productID]);
        cart[productID] = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({
            cart: cart,
        });
    };

    placeOrder = () => {
        const total = (
            this.state.subtotal * 1.0725 +
            this.state.delivery_fees
        ).toFixed(2);
        const user = AuthenticationService.getCurrentUser();
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        let currentDate = new Date();
        let datetime =
            currentDate.getFullYear() +
            "-" +
            (currentDate.getMonth() + 1) +
            "-" +
            currentDate.getDate();
        let isCorrect = true;
        // checking the inputs
        if (!cartInfo.length) {
            // alert("There is no item in cart!!!");
            toast.info("There is no item in cart!!!");
            isCorrect = false;
        } else {
            if (!this.state.addressID) {
                // alert("Please choose an address");
                toast.error("Please choose an address");
                isCorrect = false;
            }
            if (this.state.cc_number.length != 16) {
                // alert("Card Number is invalid");
                toast.error("Card Number is invalid");
                isCorrect = false;
            }
        }
        if (isCorrect) {
            let Order = {
                customerID: currentUser.customerID,
                paymentamount: total,
                ccnumber: this.state.cc_number,
                datetime: datetime,
                addressID: this.state.addressID,
            };
            let orderItem = [];
            cartInfo.forEach((product) => {
                let item = {};
                item["productID"] = product.id;
                item["quantity"] = cart[product.id];
                orderItem.push(item);
            });
            console.log("placeOrder");
            console.log(Order);
            console.log(orderItem);
            fetch("/order/checkout", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.accesstoken,
                },
                body: JSON.stringify({
                    Order: Order,
                    orderItem: orderItem,
                }),
            })
                .then((Response) => Response.json())
                .then((json) => {
                    if (json.error === "TokenExpiredError") {
                        console.log(json.error);
                        // alert("Order failed");
                        toast.error("Order failed");
                    } else {
                        this.props.history.push("/");
                        localStorage.removeItem("cart");
                        localStorage.removeItem("cartInfo");
                        alert(json.message);
                    }
                });
        }
    };

    getReviews = (product) => {
        console.log("Run getReviews");
        const user = AuthenticationService.getCurrentUser();
        let productID = product.id.toString();

        fetch("/review", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + user.accesstoken,
            },
            body: JSON.stringify({
                productID: productID,
            }),
        })
            .then((Response) => Response.json())
            .then((json) => {
                if (json.error === "TokenExpiredError") {
                    console.log(json.error);
                    localStorage.clear();
                    this.props.history.push("/");
                } else {
                    localStorage.setItem(
                        "productReviews",
                        JSON.stringify(json)
                    );
                    if (json.length != 0) {
                        this.props.history.push("/productreviews");
                    } else {
                        // alert("There are no reviews for this product!");
                        toast.info("There are no reviews for this product!");
                    }
                }
            });
    };

    componentWillMount() {
        this.calc_num_of_items();
        this.calc_subtotal();
        this.calc_delivery_fees();
        const storeDistances = JSON.parse(
            localStorage.getItem("storeDistances")
        );
        this.setState({
            storeDistances: storeDistances,
        })
        const userAddress = JSON.parse(localStorage.getItem("user")).fulladdress;
        console.log(userAddress);
        Geocode.fromAddress(userAddress).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const coordinate = [`${lat},${lng}`];
                this.setState({
                    coordinate: coordinate,
                });
                console.log("willmount in store.js", coordinate);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onClickTest() {
        console.log(this.state.delivery_rate);
    }

    render() {
        const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        const cart = JSON.parse(localStorage.getItem("cart"));
        const profile = JSON.parse(localStorage.getItem("profile"));
        const { coordinate, storeDistances } = this.state;

        return (
            <div className="checkout">
                <ThemeProvider theme={theme}>
                    <Header />
                    <div className="checkout_header">
                        {"Checkout"}{" "}
                        {"(" + Object.keys(cart).length + " Items)"}
                        {coordinate}
                    </div>
                    <div className="shipping_address_and_checkout_details_flex_container">
                        <div className="shipping_address_container">
                            <div className="shipping_address_flexbox_1">
                                <div className="shipping_heading">
                                    Shipping Address
                                </div>
                                <div className="name">
                                    {profile.info[0].firstName}{" "}
                                    {profile.info[0].lastName}
                                </div>
                            </div>
                            <div className="address_text">
                                <form className="shipping_address_form">
                                    {profile.addresses.map((address) => (
                                        <li
                                            className="address_list"
                                            key={address.id}
                                        >
                                            <div className="address_radio_button">
                                                <input
                                                    className="shipping_address_input"
                                                    type="radio"
                                                    id="shipping_address"
                                                    name="addressID"
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    onClick={() => this.getCoordinate(address.number + ' ' + address.street + ' ' + address.city + ' ' + address.zipcode)}
                                                />
                                                <DistanceMatrixService
                                                    options={{
                                                        destinations: [
                                                            "34.079962,-117.582877",
                                                            "34.136815,-117.442865",
                                                            "34.081100,-117.243605",
                                                            "34.023071,-117.408686",
                                                            "34.004858,-117.493887",
                                                            "33.922851,-117.367932",
                                                            "33.941081,-117.601548",
                                                            "34.114079,-117.359500",
                                                        ],
                                                        origins: coordinate,
                                                        travelMode: "DRIVING",
                                                    }}
                                                    callback={(response) => {
                                                        console.log("coordinate", coordinate)
                                                        localStorage.setItem(
                                                            "distances",
                                                            JSON.stringify(response)
                                                        );
                                                        const distances = response;
                                                        if (distances && distances.length > 0) {
                                                            console.log(distances)
                                                            const names = [
                                                                "Walmart",
                                                                "Whole Foods",
                                                                "Trader Joe's",
                                                                "Ralphs",
                                                                "Vons",
                                                                "Costco",
                                                                "Safeway",
                                                                "Albertsons",
                                                            ];
                                                            const storeDistances = {};
                                                            console.log(distances.rows[0].elements[0].distance.text);
                                                            distances.rows[0].elements.forEach((element, i) => {
                                                                storeDistances[names[i]] = element.distance.text;
                                                            });
                                                            localStorage.setItem(
                                                                "storeDistances",
                                                                JSON.stringify(storeDistances)
                                                            );
                                                            this.setState({
                                                                storeDistances: storeDistances,
                                                            })
                                                            this.calc_delivery_fees();
                                                        }
                                                    }}
                                                />
                                                <label
                                                    className="shipping_address_label"
                                                    for="shipping_address"
                                                >
                                                    {address.number}{" "}
                                                    {address.street}
                                                    {", "}
                                                    {address.city}
                                                    {", "}
                                                    {address.zipcode}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </form>
                            </div>
                            <div className="delivery_option">
                                <div className="delivery_option_header">
                                    Delivery Options
                                </div>
                                <div className="delivery_option_radio_buttons_container">
                                    <div className="delivery_option_radio_button">
                                        <input
                                            className="delivery_option_input"
                                            type="radio"
                                            value={0.1}
                                            id="delivery_rate"
                                            name="delivery_rate"
                                            clicked={this.state.delivery_rate === 0.1}
                                            onChange={
                                                this.handleDeliveryRateChange
                                            }
                                        />
                                        <label
                                            className="delivery_option_label"
                                            for="delivery_rate"
                                        >
                                            Standard delivery: $0.10 per mile
                                        </label>
                                    </div>
                                    <div className="delivery_option_radio_button">
                                        <input
                                            className="delivery_option_input"
                                            type="radio"
                                            value={0.2}
                                            id="delivery_rate"
                                            name="delivery_rate"
                                            clicked={this.state.delivery_rate === 0.2}
                                            onChange={
                                                this.handleDeliveryRateChange
                                            }
                                        />
                                        <label
                                            className="delivery_option_label"
                                            for="delivery_rate"
                                        >
                                            Express delivery: $0.20 per mile
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout_details_container">
                            <div className="order_summary">Order Summary:</div>
                            <div className="num_of_items_box">
                                <div className="num_of_items">
                                    {"Number of items: "}
                                </div>
                                <div className="num_of_items_num">
                                    {this.state.num_of_items}
                                </div>
                            </div>
                            <div className="subtotal_box">
                                <div className="subtotal">{"Subtotal: "}</div>
                                <div className="subtotal_num">
                                    {"$"}
                                    {this.state.subtotal.toFixed(2)}
                                </div>
                            </div>
                            <div className="delivery_fees_box">
                                <div className="delivery_fees">
                                    {"Delivery fees: "}
                                </div>
                                <div className="delivery_fees_num">
                                    {"$"}
                                    {this.state.delivery_fees.toFixed(2)}
                                </div>
                            </div>
                            <div className="tax_fees_box">
                                <div className="tax_fees">
                                    {"Tax fees: (7.25%)"}
                                </div>
                                <div className="tax_fees_num">
                                    {"$"}{" "}
                                    {(this.state.subtotal * 0.0725).toFixed(2)}
                                </div>
                            </div>
                            <div className="order_total_box">
                                <div className="order_total">
                                    {"Order total: "}
                                </div>
                                <div className="order_total_num">
                                    {"$"}
                                    {(
                                        this.state.subtotal * 1.0725 +
                                        this.state.delivery_fees
                                    ).toFixed(2)}
                                </div>
                            </div>
                            <Button
                                className="place_your_order"
                                variant="contained"
                                color="primary"
                                onClick={this.placeOrder}
                            // Event TODO onClick
                            >
                                Place your order
                            </Button>
                        </div>
                    </div>
                    <div className="payment_info_flex_container">
                        <div className="payment_info_container">
                            <div className="payment_info_body_flexbox">
                                <div className="payment_header">
                                    Payment Method
                                </div>
                                {/* TODO */}
                                <TextField
                                    className="cc_number_textfield"
                                    variant="standard"
                                    type="cc_number"
                                    name="cc_number"
                                    label="Card number"
                                    value={this.state.cc_number}
                                    onChange={this.handleInputChange}
                                ></TextField>
                                <TextField
                                    className="cc_name_textfield"
                                    variant="standard"
                                    type="cc_name"
                                    name="cc_name"
                                    label="Name on card"
                                    value={this.state.cc_name}
                                    onChange={this.handleInputChange}
                                ></TextField>
                                <TextField
                                    className="cc_cvv_number_textfield"
                                    variant="standard"
                                    type="cc_cvv_number"
                                    name="cc_cvv_number"
                                    label="CVV"
                                    value={this.state.cc_cvv_number}
                                    onChange={this.handleInputChange}
                                ></TextField>
                                <div className="expiration_date">
                                    Expiration date:
                                </div>
                                <select
                                    className="month_select"
                                    type="cc_month"
                                    name="cc_month"
                                    value={this.state.cc_month}
                                    onChange={this.handleInputChange}
                                >
                                    <option value="invalid">MM</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="02">04</option>
                                    <option value="02">05</option>
                                    <option value="02">06</option>
                                    <option value="02">07</option>
                                    <option value="02">08</option>
                                    <option value="02">09</option>
                                    <option value="02">10</option>
                                    <option value="02">11</option>
                                    <option value="02">12</option>
                                </select>
                                <select
                                    className="year_select"
                                    type="cc_year"
                                    name="cc_year"
                                    value={this.state.cc_year}
                                    onChange={this.handleInputChange}
                                >
                                    <option value="invalid">YYYY</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2030">2031</option>
                                    <option value="2031">2032</option>
                                    <option value="2032">2033</option>
                                    <option value="2033">2034</option>
                                    <option value="2034">2035</option>
                                    <option value="2035">2036</option>
                                    <option value="2036">2037</option>
                                    <option value="2037">2038</option>
                                    <option value="2038">2039</option>
                                    <option value="2039">2040</option>
                                    <option value="2041">2041</option>
                                </select>
                                {/* <Button
                                    className="change_button"
                                    color="primary"
                                >
                                    Change
                                </Button> */}
                            </div>
                        </div>
                    </div>
                    <div className="review_items_subheading">Review items</div>
                    <div className="products_flex_container">
                        <div className="products_container">
                            {cartInfo.map((product) => (
                                <CheckoutItem
                                    product={product}
                                    cart={cart}
                                    convert={this.convertDistance}
                                    update={this.updateCart}
                                    storeDistances={storeDistances}
                                    update_num_of_items={this.calc_num_of_items}
                                    update_subtotal={this.calc_subtotal}
                                    remove={this.removeFromCart}
                                    getReviews={this.getReviews}
                                />
                            ))}
                        </div>
                    </div>
                    <Button
                        className="return_to_cart"
                        variant="contained"
                        color="primary"
                        onClick={this.backtoCart}
                    >
                        Return to cart
                    </Button>
                    <Footer />
                </ThemeProvider>
            </div>
        );
    }
}

export default Checkout;
