import React, { Component } from "react";
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";

import { selectCoder } from '../redux/actions';

class CoderCard extends Component {
    handleSelectCoder(coderId) {
        this.props.selectCoder(this.props.userId, coderId);
    }

    render() {
        const { coder } = this.props;

        return (
            <Card
                className="select-card"
                border="primary"
                onClick={() => this.handleSelectCoder(coder.id)}
            >
                <div>{coder.username}</div>
            </Card>
        );
    }
}

export default connect(null, { selectCoder })(CoderCard);
