import React, { Component } from "react";

class error extends Component {
    render() {
        const { errorCode } = this.props.match.params;
        return (
        <div className="container-fluid main-page">
            <h4>This is not a good page to be on.</h4>
            <p>Oh dear, we seem to have experienced a {errorCode} error. Well, you know what they say: "Character is what you get when you don't get what you want."  You've just gotten yourself a little bit of character.  Check your request and make sure it's got the required information and that you have the correct credentials for the request.  If it's our error, we are sorry. Please submit the error to our hardworking team of ingrates and they'll eventually do something about it.</p>
        </div>
        );
    }
}

export default error;
