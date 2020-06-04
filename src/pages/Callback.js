import React, { Component } from "react";
import { connect } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";

import { handleAuthentication } from '../redux/actions';

class Callback extends Component {
    componentDidMount() {
        // handle authentication if expected values are in URL:
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.handleAuthentication();
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

export default connect(null, { handleAuthentication })(Callback)
