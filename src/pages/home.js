import React, { Component, Fragment } from "react";
import axios from "axios";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import history from "../utils/history";
import { BACKEND } from "../config";

class Home extends Component {
    state = {
        usertype: null,
        profile: null,
        error: "",
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated()) {
            this.getUser();
        }
    }

    getUser() {
        this.props.auth.getProfile((profile, error) => {
            this.setState({ profile, error });
            axios.get(`${BACKEND}/`);
            console.log(profile);
        });
        console.log(this.state.profile);
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { profile } = this.state;

        return (
            <div className="main-page container-fluid">
                {!isAuthenticated() && (
                    <Fragment>
                        <h2>{"welcome to funcster..."}</h2>
                        <div className="spacer" />
                        <p>
                            funcster is a snippet library and reviewing platform
                            for python functions and classes. Store your
                            functions and classes in a searchable library, and
                            get a mentor to review and edit your code.
                        </p>
                        <h4>sign up and get started!</h4>
                        <div className="spacer" />
                        <ButtonGroup className="signup-btns">
                            <Button
                                variant="outline-primary"
                                onClick={() => history.push("/signup/coder")}
                            >
                                I'm a Coder
                            </Button>
                            <Button
                                className="btn-right"
                                variant="outline-secondary"
                                onClick={() => history.push("/signup/mentor")}
                            >
                                I'm a Mentor
                            </Button>
                        </ButtonGroup>
                    </Fragment>
                )}

                {isAuthenticated() && profile && (
                    <Fragment>
                        <h4>{`Welcome back, ${profile.nickname} `}</h4>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default Home;
