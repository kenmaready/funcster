import React, { Component } from "react";

import Landing from "../components/Landing";
import Loading from '../components/Loading';
import CoderHome from "../components/CoderHome";
import MentorHome from "../components/MentorHome";

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
            this.setState({ usertype: profile.usertype });
            //axios.get(`${BACKEND}/`);
        });
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { profile } = this.state;

        return (
            <div className="main-page container-fluid">
                {!isAuthenticated() && <Landing />}
                {isAuthenticated() && !profile?.usertype && (
                    <Loading />
                )}
                {isAuthenticated() &&
                    profile &&
                    profile.usertype &&
                    (profile.usertype === "Coder" ? (
                        <CoderHome profile={profile} />
                    ) : (
                        <MentorHome profile={profile} />
                    ))}
            </div>
        );
    }
}

export default Home;
