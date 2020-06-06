import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

import SnippetCard from "./SnippetCard";
import Loading from "./Loading";
import Mentors from "./Mentors";
import history from "../utils/history";

class CoderHome extends Component {
    state = {
        selectingMentor: false,
    };

    handleShowMentors = (event) => {
        this.setState({ selectingMentor: !this.state.selectingMentor });
    };

    handleSnippetClick = (snippetId) => {
        history.push(`/snippet/${snippetId}`);
    };

    render() {
        const { profile } = this.props.user;

        const showSnippets =
            profile && profile.snippets ? (
                profile.snippets.map((snippet) => {
                    return (
                        <SnippetCard
                            key={snippet.id}
                            snippet={snippet}
                            usertype={"Coder"}
                            userId={profile.userId}
                        />
                    );
                })
            ) : (
                <Loading />
            );

        return (
            <div className="container-fluid">
                <h4>Welcome back, {profile.username}</h4>
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
                                <small
                                    className="link-text"
                                    onClick={this.handleShowMentors}
                                >
                                    Click here to select new mentor
                                </small>
                            </Card.Text>
                        ) : (
                            <Card.Text as="div">
                                <p>You do not currently have a mentor.</p>
                                <br />
                                <small
                                    className="link-text"
                                    onClick={this.handleShowMentors}
                                >
                                    Click here to select a mentor
                                </small>
                            </Card.Text>
                        )}
                        {this.state.selectingMentor && <Mentors />}
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
                                <Link to={`/snippet/new`}>
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

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(CoderHome);
