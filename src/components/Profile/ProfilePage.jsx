import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Header from "../Header";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import "../../css/ProfilePage.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      logout: false,
    };
  }

  logOut(event) {
    event.preventDefault();
    localStorage.removeItem("usertoken");
    this.setState({ logout: true }, () => {
      this.props.logout();
    });
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    if (token !== undefined) {
      const decoded = jwt_decode(token);
      this.setState({
        first_name: decoded.identity.first_name,
        last_name: decoded.identity.last_name,
        email: decoded.identity.email,
      });
    }
  }

  render() {
    return (
      <>
      <div className="box3">
        <Header header="Profile" />
        <div>
          <div className="profile-info">
            <h2>
              <span className="title">First Name:</span> <br></br>{this.state.first_name}
            </h2>
            <h2>
              <span className="title">Last Name: </span><br></br>
              {this.state.last_name}
            </h2>
            <h2>
              <span className="title">Email Address:</span> {this.state.email}
            </h2>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="logout"
            onClick={(event) => {
              this.logOut(event);
            }}
          >
            Logout
          </Button>
        </div>
        {this.state.logout && <Redirect to="/login" />}
        </div>
      </>
    );
  }
}

export default Profile;
