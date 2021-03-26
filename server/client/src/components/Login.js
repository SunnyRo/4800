import React, { Component } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  Button,
  TextField,
} from "@material-ui/core";
import "./css/Login.css";
import { Link } from "react-router-dom";
import Img from "./images/GroceryStore.jpg";
import Img2 from "./images/cartoondelivery.jpg";
import Header from "./Header";
import AuthenticationService from "./Authentication";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#06C167",
    },
    secondary: {
      main: "#06C167",
    },
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accesstoken: "",
      // message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.signin = this.signin.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    if (user) {
      this.props.history.push("/home/stores");
      // return this.props.history.push("/home/stores")
      // return <Redirect to='/Welcome' />
    }
  }
  // Testing
  signin = () => {
    const { email, password } = this.state;
    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((Response) => Response.json())
      .then((json) => {
        if (json.message) {
          console.log(json.message);
          alert("User does not exist");
        } else {
          // this.setState({
          //   accesstoken: "Bearer " + json.accesstoken
          // })
          localStorage.setItem("user", JSON.stringify(json));
          this.props.history.push("/home/stores");
        }
      })
  }
  render() {
    return (
      <div className="loginContainer">
        <Header />
        <div>
          <h1 className="heading">
            Fresh groceries, delivered right to your door
          </h1>
        </div>
        <div className="row">
          <div className="leftColumn">

          </div>
          <div className="rightColumn">
            <div>
              <h2 className="signInHeading">
                Please sign in to continue
              </h2>
            </div>
            <ThemeProvider theme={theme}>
              <div className="signInFields">
                <TextField
                  variant="standard"
                  type="email"
                  name="email"
                  label="Email"
                  color="primary"
                  style={style}
                  value={this.state.email}
                  onChange={this.handleChange}
                ></TextField>
              </div>
              <br />
              <div className="signInFields">
                <TextField
                  variant="standard"
                  type="password"
                  name="password"
                  label="Password"
                  color="primary"
                  style={style}
                  value={this.state.password}
                  onChange={this.handleChange}
                ></TextField>
              </div>
              <br />
              <div className="signInFields">
                <Button
                  onClick={this.signin}
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={button}>
                  Sign In
                </Button>
              </div>
              <div>
                <h3>New to Growceries?</h3>
              </div>
              <div>
                <Button
                  component={Link}
                  to="/Signup"
                  variant="contained"
                  color="primary"
                  style={button}>
                  Sign up here
                </Button>
              </div>
            </ThemeProvider>
          </div>
        </div>
        <div className="row">
          <div className="leftColumn2">
            <div className="leftColumnHeading">
              Why choose Growceries?
            </div>
            <div className="leftColumnBody">
              <div>
                Growceries delivers in as little as an hour from local grocery stores.
                Get the best products for the best prices delivered right to your doostep.
              </div>
            </div>
          </div>
          <div className="rightColumn2">

          </div>
        </div>
        <div className="row">
          <div className="leftColumn3">
            <h2 className="localStoresHeading">
              Support Local Grocery Stores
            </h2>
            <div className="localStoresBody">
              <div>
                Shopping local helps local businesses and it also means your groceries
                arrive in a timely manner.
              </div>
              <div className="storeImg">
                <img src={Img} alt="groceryStore" />
              </div>
            </div>
          </div>
          <div className="rightColumn3">
            <h2 className="driversHeading">
              Great Delivery Drivers
            </h2>
            <div className="driversBody">
              Our delivery drivers are carefully selected in order to ensure great service.
            </div>
              <div className="driverImg">
                <img src={Img2} alt="deliverydriver"/>
              </div>
          </div>
        </div>
      </div>

    );
  }
}

const style = {
  margin: 10,
  width: 300,
};
const button = {
  width: 300,
  height: 30,
  borderRadius: 20,
};
export default Login;
