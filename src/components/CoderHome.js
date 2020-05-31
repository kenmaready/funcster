import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import history from "../utils/history";
import SnippetCard from "./SnippetCard";
import SnippetEditor from "./SnippetEditor";

export default class CoderHome extends Component {
    handleClick = (event) => {
        event.preventDefault();
        console.log("I got clicked!");
    };

    handleSnippetClick = (snippetId) => {
        history.push(`/snippet/${snippetId}`);
    };

    render() {
        const { profile } = this.props;
        console.log(profile);

        const showSnippets = profile.snippets.map((snippet) => {
            return (
                <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    userId={this.props.profile.userId}
                />
            );
        });
        return (
            <div className="container-fluid">
                <h4>Welcome back, {this.props.profile.nickname}</h4>
                <br />

                {/* Mentor Card Section */}
                <Card
                    as={"div"}
                    border={"primary"}
                    style={{
                        width: "50vw",
                        minWidth: "200px",
                        maxWidth: "98vw",
                    }}
                >
                    <Card.Body>
                        <Card.Subtitle>Mentor:</Card.Subtitle>
                        <hr></hr>
                        {profile.mentor ? (
                            <Card.Text as="div">
                                <p>
                                    Your mentor is{" "}
                                    <strong>{profile.mentor}</strong>.
                                </p>
                                <Link to="/">
                                    <small>
                                        Click here to select new mentor
                                    </small>
                                </Link>
                            </Card.Text>
                        ) : (
                            <Card.Text>
                                <p>You do not currently have a mentor.</p>
                                <br />
                                <small>
                                    <Link to={"/"}>
                                        Click here to select a mentor
                                    </Link>
                                </small>
                            </Card.Text>
                        )}
                    </Card.Body>
                </Card>
                <br />

                {/* Snippets Card Section */}
                <Card as={"div"} border={"primary"} style={{ width: "50vw" }}>
                    <Card.Body>
                        <Card.Subtitle>Snippets:</Card.Subtitle>
                        <hr></hr>
                        <Card.Text as={"div"}>
                            {profile.snippets ? (
                                <>
                                    <div>{showSnippets}</div>
                                    <br></br>
                                </>
                            ) : (
                                <p>
                                    You do not currently have any code snippets
                                    in your library.
                                </p>
                            )}
                            <small>
                                <Link
                                    to={`/coder/${this.props.profile.userId}/snippet/new`}
                                >
                                    Click here to create a new code snippet
                                </Link>
                            </small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
