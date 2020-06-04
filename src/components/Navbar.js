import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

import { login, logout, isAuthenticated } from "../redux/actions";
import history from "../utils/history";

class NavBar extends Component {

    render() {
        const { login, logout, isAuthenticated } = this.props;

        const showNavLinks = (
            <div className="container-fluid">
                <Fragment>
                    <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
                    {isAuthenticated() ? (
                        <Fragment>
                            <Nav.Link
                                className="btn-right"
                                onClick={logout}
                            >
                                Logout
                            </Nav.Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Nav.Link
                                className="btn-right"
                                onClick={login}
                            >
                                Login
                            </Nav.Link>
                        </Fragment>
                    )}
                </Fragment>
            </div>
        );

        return (
            <div>
                <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
                    <Navbar.Brand>{"</> funcster"}</Navbar.Brand>
                    <Nav className="mr-auto">{showNavLinks}</Nav>
                </Navbar>
            </div>
        );
    }
}

export default connect(null, { login, logout, isAuthenticated })(NavBar);
