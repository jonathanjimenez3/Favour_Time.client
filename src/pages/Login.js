import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.login({ email, password });
    this.props.history.push("/")
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type='email' name='email' value={email} onChange={this.handleChange}/>

          <label>Password:</label>
          <input type='password' name='password' value={password} onChange={this.handleChange}/>

          <input type='submit' value='Login' />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);