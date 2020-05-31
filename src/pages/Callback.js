import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

export default class Callback extends Component {
    componentDidMount() {
        // handle authentication if expected values are in URL:
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        } else {
            throw new Error("Invalid callback URL received from auth0");
        }
    }

    render() {
        return (
            <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">
                    <h4>Twiddling thumbs ... just a sec.</h4>
                </span>
            </Spinner>
        );
    }
}
