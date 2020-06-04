import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import MentorCard from "./MentorCard";
import { getMentors, getProfile, isAuthenticated } from "../redux/actions";

class Mentors extends Component {

    componentDidMount() {
        this.props.getProfile();
        this.props.getMentors();
    }

    render() {
        const { profile } = this.props.user;
        const { mentors, loading } = this.props.mentors;

        const showMentors = mentors.map((mentor, ix) => {
            return (
                <MentorCard key={ix} mentor={mentor} userId={profile.userId} />
            );
        });

        return (
            <div>
                <p>Select a mentor:</p>
                {!this.props.isAuthenticated() || loading ? (
                    <Loading />
                ) : mentors.length > 0 ? (
                    <div>{showMentors}</div>
                ) : (
                    <p>We're sorry, there are not any mentors currently available.</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    mentors: state.mentors,
});

export default connect(mapStateToProps, {
    getMentors,
    getProfile,
    isAuthenticated,
})(Mentors);
