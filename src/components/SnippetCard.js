import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FileText } from "react-bootstrap-icons";

import history from "../utils/history";

class SnippetCard extends Component {
    handleSnippetClick = (snippetId) => {
        history.push(`/snippet/${snippetId}`);
    };

    render() {
        const { snippet } = this.props;

        return (
            <Card
                className="select-card"
                border="primary"
                onClick={() => {
                    this.handleSnippetClick(snippet.id);
                }}
            >
                <div>
                    {snippet.snippet_name}
                    {/*if snippet has comments & a Coder is viewing the list, add comment icon to card*/}
                    {snippet.comments && this.props.usertype === "Coder" && (
                        <FileText className="select-card-icon" />
                    )}
                </div>
            </Card>
        );
    }
}

export default SnippetCard;
