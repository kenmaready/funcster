import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

import { selectMentor } from "../redux/actions";

class MentorCard extends Component {
    handleSelectMentor = (mentorId) => {
        this.props.selectMentor(this.props.userId, mentorId);
    };

    render() {
        const { mentor } = this.props;

        return (
            <Card
                className="select-card"
                border="primary"
                onClick={() => this.handleSelectMentor(mentor.id)}
            >
                <div>{mentor.username}</div>
            </Card>
        );
    }
}

export default connect(null, { selectMentor })(MentorCard);
