import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Coders from "./Coders";
import SnippetCard from "./SnippetCard";

class MentorHome extends Component {
    state = {
        selectingCoder: false,
    };

    handleShowAvailableCoders = (event) => {
        this.setState({ selectingCoder: !this.state.selectingCoder });
    };

    render() {
        const { profile } = this.props.user;

        const showCoders = profile.coders.map((coder, ix) => {
            return (
                <div key={ix}>
                    <strong>{coder.username}</strong>
                    {coder.snippets.length > 0 ? (
                        coder.snippets.map((snippet) => {
                            return (
                                <SnippetCard
                                    key={snippet.id}
                                    snippet={snippet}
                                    usertype={"Mentor"}
                                />
                            );
                        })
                    ) : (
                        <p>
                            This coder currently has no snippets that need
                            review
                        </p>
                    )}
                    <hr></hr>
                </div>
            );
        });

        return (
            <div className="container-fluid">
                <h4>Welcome back, {profile.username}</h4>
                <br />

                {/* Coder Card Section */}
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
                        <Card.Subtitle>
                            Snippets for you to review:
                        </Card.Subtitle>
                        <hr></hr>
                        {profile.coders && profile.coders.length > 0 ? (
                            <Card.Text as={"div"}>{showCoders}</Card.Text>
                        ) : (
                            <Card.Text>
                                You do not currently have any coders.
                            </Card.Text>
                        )}
                        <small
                            className="link-text"
                            onClick={this.handleShowAvailableCoders}
                        >
                            Click here to add a Coder
                        </small>
                        {this.state.selectingCoder && (
                            <Coders
                                auth={this.props.auth}
                                userId={profile.userId}
                                selectCoderFunction={this.handleSelectCoder}
                            />
                        )}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(MentorHome);
