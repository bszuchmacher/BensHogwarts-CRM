import React, { Component } from "react";
import { register, login } from "../../lib/UserAPI.js";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";
import AlertMessage from "../Alert";
import "../../css/RegisterAndLogin.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      successfulRegister: false,
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
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };
    register(newUser).then((response) => {
      if (response.statusText === "OK") {
        this.loginUser();
      } else {
        this.setState({
          alertMessage: response.data.error,
          alertSeverity: "error",
          alertOpen: true,
        });
      }
    });
  }

  loginUser() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    login(user).then((response) => {
      if (response.statusText === "OK") {
        this.props.login();
        this.setState({ successfulRegister: true });
      }
    });
  }

  render() {
    let { alertOpen, alertSeverity, alertMessage } = this.state;
    return (
      <>
        <div className="register-container">
          <h1>Register</h1>
          <form className="register-form" noValidate onSubmit={this.onSubmit}>
            <TextField
              id="outlined-basic"
              label="First Name"
              name="first_name"
              variant="outlined"
              className="register-form-text-field"
              onChange={this.onChange}
            />
            <TextField
              id="outlined-basic"
              name="last_name"
              label="Last Name"
              variant="outlined"
              className="register-form-text-field"
              onChange={this.onChange}
            />
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
              Register
            </Button>
          </form>
          <p className="link-to-register-page">
            * Already have an account?
            <NavLink exact to="/login" className="navlink-to-register">
              Login here
            </NavLink>
          </p>
        </div>
        <AlertMessage
          open={alertOpen}
          message={alertMessage}
          severity={alertSeverity}
          handleClose={() => {
            this.setState({ alertOpen: false });
          }}
        />
        {this.state.successfulRegister && <Redirect to="/" />}
      </>
    );
  }
}

export default Register;
