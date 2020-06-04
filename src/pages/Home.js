import React, { Component } from "react";
import { connect } from "react-redux";
import Landing from "../components/Landing";
import Loading from "../components/Loading";
import CoderHome from "../components/CoderHome";
import MentorHome from "../components/MentorHome";

import { isAuthenticated, getProfile } from "../redux/actions";

class Home extends Component {

    componentDidMount() {
        if (this.props.isAuthenticated()) {
            this.getUser();
        }
    }

    getUser() {
        this.props.getProfile();
    }

    render() {
        const { isAuthenticated } = this.props;
        const { profile } = this.props.user;

        return (
            <div className="main-page container-fluid">
                {!isAuthenticated() && <Landing />}
                {isAuthenticated() && !profile?.usertype && <Loading />}
                {isAuthenticated() &&
                    profile &&
                    profile.usertype &&
                    (profile.usertype === "Coder" ? (
                        <CoderHome auth={this.props.auth} />
                    ) : (
                        <MentorHome auth={this.props.auth} />
                    ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, { isAuthenticated, getProfile })(Home);
