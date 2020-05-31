import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-python";

import Loading from "./Loading";
import history from "../utils/history";
import { BACKEND } from "../config";

class SnippetEditor extends Component {
    state = {
        snippet: null,
    };

    componentDidMount() {
        const snippetId = this.props.match.params.snippetId;
        const coderId = this.props.match.params.userId;
        console.log(coderId);
        this.setState({ snippetId });
        if (this.props.auth.isAuthenticated() && snippetId != "new") {
            this.getSnippet(snippetId);
        }
        if (this.props.auth.isAuthenticated() && snippetId === "new") {
            this.setState({
                snippet: {
                    id: 0,
                    name: "",
                    code: "",
                    coderId: coderId,
                    needsReview: false,
                    comments: [],
                },
            });
        }
        //const snippet = this.props.auth.userProfile.snippets.find(
        //    (snip) => snip.id === snippetId
        //);
        //console.log("found snippet: ", snippet);
    }

    getSnippet(snippetId) {
        this.props.auth.getSnippet(snippetId, (snippet) => {
            this.setState({ snippet });
        });
    }

    handleChange = (event) => {
        if (event.target.name === "needsReview") {
            this.setState({
                snippet: {
                    ...this.state.snippet,
                    needsReview: !this.state.snippet.needsReview,
                },
            });
        } else {
            console.log(event.target.name);
            this.setState({
                snippet: {
                    ...this.state.snippet,
                    [event.target.name]: event.target.value,
                },
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.snippet.name || !this.state.snippet.code) {
            alert("Invalid submission. Snippet must have name and code.");
        } else if (this.props.match.params.snippetId === "new") {
            axios
                .post(
                    `${BACKEND}/snippet/new`,
                    {
                        name: this.state.snippet.name,
                        code: this.state.snippet.code,
                        needsReview: this.state.snippet.needsReview,
                        coderId: this.props.match.params.userId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
                        },
                    }
                )
                .then((response) => {
                    console.log("response received...");
                    console.log(response);
                    return {
                        response: response,
                    };
                })
                .then((response) => history.push("/"))
                .catch((err) => console.error(err));
        } else {
            axios
                .post(
                    `${BACKEND}/snippet/${this.props.match.params.snippetId}`,
                    {
                        name: this.state.snippet.name,
                        code: this.state.snippet.code,
                        needsReview: this.state.snippet.needsReview,
                        coderId: this.props.match.params.userId,
                        comments: null,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
                        },
                    }
                )
                .then((response) => {
                    console.log("response received...");
                    console.log(response);
                    return {
                        response: response,
                    };
                })
                .then((response) => history.push("/"))
                .catch((err) => console.error(err));
        }
    };

    render() {
        console.log(this.props.auth);
        const { snippet } = this.state;

        return (
            <div className="main-page">
                {snippet ? (
                    <Form>
                        <FormGroup controlId="formSnippetname">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={snippet.name}
                                name="name"
                                onChange={this.handleChange}
                                placeholder="enter a name for this code snippet"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Code Editor:</Form.Label>
                            <Editor
                                required
                                className="snippet-editor"
                                value={snippet.code}
                                onValueChange={(code) =>
                                    this.setState({
                                        snippet: { ...snippet, code },
                                    })
                                }
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

                        {this.state.hasComments && (
                            <Form.Group>
                                <Form.Label>
                                    Your Mentor left you some comments on this
                                    code:
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    readOnly
                                    value={snippet.comments}
                                />
                            </Form.Group>
                        )}

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Flag for review by mentor"
                                name="needsReview"
                                checked={snippet.needsReview}
                                onChange={this.handleChange}
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
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
}

export default SnippetEditor;
