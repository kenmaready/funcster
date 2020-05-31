import React, { Component } from "react";
import axios from "axios";

import { BACKEND } from "../config";

class Coders extends Component {
    state = {
        message: "",
        coders: [],
    };

    componentDidMount() {
        this.getCoders();
    }

    getCoders() {
        axios
            .get(`${BACKEND}/coders`, {
                headers: {
                    Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({ coders: response.data.coders });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const showCoders = this.state.coders.map((coder, ix) => {
            return <div key={ix}>{coder.username}</div>;
        });

        return (
            <div className="main-page">
                {!isAuthenticated() ? (
                    <h4>loading...</h4>
                ) : (
                    <>
                        <h4>Coders:</h4>
                        <div>{showCoders}</div>
                    </>
                )}
            </div>
        );
    }
}

export default Coders;
