import React, { Component } from "react";
import { login } from "../../lib/UserAPI.js";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";
import AlertMessage from "../Alert";
import "../../css/RegisterAndLogin.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
      alertOpen: false,
      alertSeverity: "success",
      alertMessage: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    login(user).then((response) => {
      if (response.statusText === "OK") {
        this.props.login();
        this.setState({ successfulLogin: true });
      } else {
        this.setState({
          alertMessage: response.data.error,
          alertSeverity: "error",
          alertOpen: true,
        });
      }
    });
  }

  render() {
    let { alertOpen, alertSeverity, alertMessage } = this.state;
    return (
      <>
        <div className="register-container">
          <h1>Sign In</h1>
          <form className="register-form" noValidate onSubmit={this.onSubmit}>
            <TextField
              id="outlined-basic"
              name="email"
              label="Email Address"
              variant="outlined"
              className="register-form-text-field"
              onChange={this.onChange}
            />
            <TextField
              id="outlined-basic"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              className="register-form-text-field"
              onChange={this.onChange}
            />
            <Button
              variant="contained"
              color="primary"
              className="register-button"
              type="submit"
              onChange={this.onChange}
            >
              Sign In
            </Button>
            <p className="link-to-register-page">
              * Don't have an account? *
              <NavLink exact to="/register" className="navlink-to-register">
                Register here
              </NavLink>
            </p>
          </form>
        </div>
        <AlertMessage
          open={alertOpen}
          message={alertMessage}
          severity={alertSeverity}
          handleClose={() => {
            this.setState({ alertOpen: false });
          }}
        />
        {this.state.successfulLogin && <Redirect to="/" />}
      </>
    );
  }
}

export default Login;
