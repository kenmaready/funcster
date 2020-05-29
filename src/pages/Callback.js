import React, { Component } from 'react'

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
            <div className="main-page">
                <h4>Logging you into funcster.  Just a sec...</h4>
            </div>
        )
    }
}
