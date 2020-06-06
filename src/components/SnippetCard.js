import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { FileText, Trash } from "react-bootstrap-icons";

import history from "../utils/history";
import { deleteSnippet } from "../redux/actions";

class SnippetCard extends Component {
    state = {
        hovering: false,
    };

    handleDelete = (event) => {
        event.stopPropagation();
        this.props.deleteSnippet(this.props.snippet.id, this.props.userId);
    };

    handleSnippetClick = (snippetId) => {
        history.push(`/snippet/${snippetId}`);
    };

    setHovering = (hoverState) => {
        this.setState({ hovering: hoverState });
    };

    render() {
        const { snippet } = this.props;

        return (
            <Card
                className="select-card"
                border="primary"
                onMouseEnter={() => this.setHovering(true)}
                onMouseLeave={() => this.setHovering(false)}
                onClick={() => {
                    this.handleSnippetClick(snippet.id);
                }}
            >
                <div>
                    {snippet.snippet_name}
                    {/*if snippet has comments & a Coder is viewing the list, add comment icon to card*/}
                    {this.props.usertype === "Coder" && this.state.hovering && (
                        <Trash
                            className="select-card-icon"
                            onClick={this.handleDelete}
                        />
                    )}
                    {snippet.comments && this.props.usertype === "Coder" && (
                        <FileText className="select-card-icon" />
                    )}
                </div>
            </Card>
        );
    }
}

export default connect(null, { deleteSnippet })(SnippetCard);
