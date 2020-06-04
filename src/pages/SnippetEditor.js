import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-python";

import Loading from "../components/Loading";
import {
    clearSnippet,
    getProfile,
    getSnippet,
    isAuthenticated,
    submitSnippet,
} from "../redux/actions";

class SnippetEditor extends Component {
    state = {
        snippet: null,
    };

    componentDidMount() {
        const snippetId = this.props.match.params.snippetId;
        if (snippetId === "new") {
            this.props.clearSnippet();
            this.setState({
                snippet: {
                    id: "new",
                    name: "",
                    code: "",
                    needsReview: false,
                    comments: "",
                },
            });
        } else {
            this.props.getSnippet(snippetId, (newSnippet) => {
                this.setState({ snippet: newSnippet });
            });
        }

        this.props.getProfile();
    }

    hasComments(snippet) {
        return snippet.comments.length > 0;
    }

    toggleNeedsReview = (event) => {
        this.setState({
            snippet: {
                ...this.state.snippet,
                needsReview: event.target.checked,
            },
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.snippet.name || !this.state.snippet.code) {
            alert("Invalid submission. Snippet must have name and code.");
        } else {
            this.props.submitSnippet(
                this.state.snippet,
                this.props.user.profile.usertype,
                this.props.user.profile.userId
            );
        }
    };

    render() {
        const { snippet, loading } = this.props.snippet;
        const { profile } = this.props.user;

        return (
            <div className="main-page">
                {loading || !this.state.snippet ? (
                    <Loading />
                ) : (
                    <Form>
                        <FormGroup controlId="formSnippetname">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.snippet.name}
                                name="name"
                                onChange={(event) => {
                                    this.setState({
                                        snippet: {
                                            ...this.state.snippet,
                                            name: event.target.value,
                                        },
                                    });
                                }}
                                placeholder="enter a name for this code snippet"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Code Editor:</Form.Label>
                            <Editor
                                required
                                className="snippet-editor"
                                value={this.state.snippet.code}
                                onValueChange={(code) => {
                                    this.setState({
                                        snippet: {
                                            ...this.state.snippet,
                                            code: code,
                                        },
                                    });
                                }}
                                highlight={(code) =>
                                    highlight(code, languages.python)
                                }
                                padding={10}
                                style={{
                                    fontFamily:
                                        '"Fira code", "Fira Mono", monospace',
                                    fontSize: 12,
                                }}
                            />
                        </FormGroup>

                        {/* Show comment box IF the user is a mentor or show comment box in 
                        read-only state if the user is a coder AND there are comments from 
                        a mentor  */}
                        {((this.state.snippet.comments &&
                            profile.usertype === "Coder") ||
                            profile.usertype === "Mentor") && (
                            <Form.Group>
                                <Form.Label>
                                    {profile.usertype === "Coder" &&
                                        "Your Mentor left you some comments on this code:"}
                                    {profile.usertype === "Mentor" &&
                                        "Leave comments for your Coder here (be nice):"}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    readOnly={profile.usertype === "Coder"}
                                    value={this.state.snippet.comments}
                                    onChange={(event) => {
                                        this.setState({
                                            snippet: {
                                                ...this.state.snippet,
                                                comments: event.target.value,
                                            },
                                        });
                                    }}
                                />
                            </Form.Group>
                        )}

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label={
                                    profile.usertype === "Coder"
                                        ? "Flag for review by mentor"
                                        : "Uncheck this box if you're finished reviewing"
                                }
                                name="needsReview"
                                checked={this.state.snippet.needsReview}
                                onChange={this.toggleNeedsReview}
                            />
                        </Form.Group>

                        <Button
                            onClick={this.handleSubmit}
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    snippet: state.snippet,
});

export default connect(mapStateToProps, {
    clearSnippet,
    getProfile,
    getSnippet,
    isAuthenticated,
    submitSnippet,
})(SnippetEditor);
