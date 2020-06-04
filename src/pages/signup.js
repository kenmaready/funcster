import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

import history from "../utils/history";
import { BACKEND } from "../utils/config";

class signup extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        usertype: this.props.match.params.usertype,
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitSignup = (event) => {
        event.preventDefault();
        if (!this.state.username || !this.state.email || !this.state.password) {
            alert(
                "Invalid submission. Must provide username, email and password."
            );
        } else {
            axios
                .post(`${BACKEND}/signup`, {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    usertype: this.state.usertype,
                })
                .then((response) => {
                    return {
                        response: response,
                    };
                })
                .then((response) => history.push("/"))
                .catch((err) => console.error(err));
        }
    };

    render() {
        return (
            <div className="main-page container-fluid">
                <h2>{this.state.usertype} sign up...</h2>
                <Form>
                    <FormGroup controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            name="username"
                            onChange={this.handleChange}
                            placeholder="enter a username"
                        />
                    </FormGroup>
                    <FormGroup controlId="formEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            placeholder="enter your email address"
                        />
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            name="password"
                            onChange={this.handleChange}
                            placeholder="enter a password"
                        />
                    </FormGroup>
                    <Button
                        onClick={this.submitSignup}
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(signup);
