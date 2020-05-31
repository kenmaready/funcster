import React, { Component } from "react";
import axios from "axios";

import { BACKEND } from "../config";

class Mentors extends Component {
    state = {
        message: "",
        mentors: [],
    };

    componentDidMount() {
        this.getMentors();
    }

    getMentors() {
        axios
            .get(`${BACKEND}/mentors`, {
                headers: {
                    Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({ mentors: response.data.mentors });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const showMentors = this.state.mentors.map((mentor, ix) => {
            return <div key={ix}>{mentor.username}</div>;
        });

        return (
            <div className="main-page">
                {!isAuthenticated() ? (
                    <h4>loading...</h4>
                ) : (
                    <>
                        <h4>Mentors:</h4>
                        <div>{showMentors}</div>
                    </>
                )}
            </div>
        );
    }
}

export default Mentors;
