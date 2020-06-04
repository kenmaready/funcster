import React, { Component } from "react";
import { connect } from "react-redux";

import CoderCard from "./CoderCard";
import Loading from "./Loading";
import { getAvailableCoders, getProfile, isAuthenticated } from "../redux/actions";

class Coders extends Component {

    componentDidMount() {
        this.props.getProfile();
        this.props.getAvailableCoders();
    }

    render() {
        const { profile } = this.props.user;
        const { coders, loading } = this.props.coders;
        
        const showCoders = coders.map((coder, ix) => {
            return (
                <CoderCard
                    key={ix}
                    coder={coder}
                    userId={profile.userId}
                />
            );
        });

        return (
            <div>
                <p>Select one of these available coders to add to your list:</p>
                {!this.props.isAuthenticated() || loading ? (
                    <Loading />
                ) : coders.length > 0 ? (
                    <div>{showCoders}</div>
                ) : (
                    <p>
                        <small>
                            Sorry, there are no Coders looking for mentors at
                            the moment
                        </small>
                    </p>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    coders: state.coders,
});

export default connect(mapStateToProps, { getAvailableCoders, getProfile, isAuthenticated })(Coders);
