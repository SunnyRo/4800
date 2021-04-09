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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    };
  }

//  componentDidMount() {
//    localStorage.clear();
//  }

  render() {
    return (
      // <div className="page-container">
      <Router>
        {/* <div className="content-wrap"> */}
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
          <Route exact component={Error} />
        </Switch>
        {/* </div> */}
        {/* <Footer /> */}
      </Router>
      // </div>
    );
  }
}
const style = {
  margin: 15
};

export default App;
