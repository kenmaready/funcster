import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FileCheck, FileText } from "react-bootstrap-icons";
import history from "../utils/history";

class SnippetCard extends Component {
    handleSnippetClick = (snippetId) => {
        history.push(`/coder/${this.props.userId}/snippet/${snippetId}`);
    };

    render() {
        const { snippet } = this.props;

        return (
            <Card
                className="snippet-card"
                border="primary"
                onClick={() => {
                    this.handleSnippetClick(snippet.id);
                }}
            >
                <div>
                    {snippet.snippet_name}
                    {snippet.comments && (
                        <FileText className="snippet-card-icon" />
                    )}
                </div>
            </Card>
        );
    }
}

export default SnippetCard;
