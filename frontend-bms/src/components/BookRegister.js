import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

//import BookService from "../BackendService/BookService";
import authService from "../services/auth.service";
import Navbar from "../Navbar";
import './FeaturedBook.css';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


export default class  Bookregister extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        authService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.cpassword

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="loginbackground">
      <div className="col-md-12">
        <div className="card card-container">
          <img
              src="data:image/png;base64,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"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                  

                <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
