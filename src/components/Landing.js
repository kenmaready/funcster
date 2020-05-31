import React, { Component, Fragment } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import history from "../utils/history";

class Landing extends Component {
    render() {
        return (
            <Fragment>
                <h2>{"welcome to funcster..."}</h2>
                <div className="spacer" />
                <p>
                    funcster is a snippet library and reviewing platform for
                    python functions and classes. Store your functions and
                    classes in a searchable library, and get a mentor to review
                    and edit your code.
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
        );
    }
}

export default Landing;
