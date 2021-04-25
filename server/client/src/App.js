import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Stores from "./components/Stores"
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Store from "./components/Store";
import Aisle from "./components/Aisle";
import OrderHistory from "./components/OrderHistory";
import OrderDetails from "./components/OrderDetails";
import AddReview from "./components/AddReview";
import ProductReviews from "./components/ProductReviews";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/home/stores" component={Stores} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/search" component={Search} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/store" component={Store} />
          <PrivateRoute exact path="/aisle" component={Aisle} />
          <PrivateRoute exact path="/orderhistory" component={OrderHistory} />
          <PrivateRoute exact path="/orderdetails" component={OrderDetails} />
          <PrivateRoute exact path="/addreview" component={AddReview} />
          <PrivateRoute exact path="/productreviews" component={ProductReviews} />
          <PrivateRoute exact path="/addreview" component={AddReview} />
          <Route exact component={Error} />
        </Switch>
      </Router>
    );
  }
}
const style = {
  margin: 15
};

export default App;
