import React, { Component } from "react";
import "./css/Search.css";
import AuthenticationService from "./Authentication";
import Header from "./Header";
import Footer from "./Footer";
import SearchItem from "./SearchItem";

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

const convertDistance = (distance) => {
    const floatDistance = parseFloat(distance);
    const result = (floatDistance * 0.621371).toFixed(2);
    return result;
};

class Product extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: true,
            search: "",
            storeDistances: {},
            quantity: 1,
            productID: "",
        };
        this.logout = this.logout.bind(this);
        this.backtoStore = this.backtoStore.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.quantity);
    };

    logout = () => {
        console.log("trying to log out");
        AuthenticationService.signOut();
        this.props.history.push("/");
        window.location.reload();
    };

    backtoStore(event) {
        this.props.history.push("/home/stores");
    }

    componentWillMount() {
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
        localStorage.setItem("storeDistances", JSON.stringify(storeDistances));
        const search = JSON.parse(localStorage.getItem("search"));
        this.setState({
            storeDistances: storeDistances,
            search: search,
        });
    }
    callBack = () => {
        this.forceUpdate();
    }

    render() {
        const { storeDistances } = this.state;
        const search = JSON.parse(localStorage.getItem("search"));

        if (search) {
            return (
                <div className="search">
                    <ThemeProvider theme={theme}>
                        <Header />
                        <div className="product_body">
                            <ul>
                                <div className="products_grid_wrapper">
                                    {search.map((product) =>
                                        <SearchItem product={product} storeDistances={storeDistances} remove={this.callBack} />
                                    )}
                                </div>
                            </ul>
                        </div>
                        <Button
                            className="back_to_store"
                            variant="contained"
                            color="primary"
                            onClick={this.backtoStore}
                        >
                            Back to Stores
                        </Button>
                        <Footer />
                    </ThemeProvider>
                </div>
            );
        } else {
            return <div className="storesContainer">Loading.............</div>;
        }
    }
}

export default Product;
