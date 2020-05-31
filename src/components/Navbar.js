import React, { Component, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import history from "../utils/history";

class NavBar extends Component {
    /*     componentDidMount() {
        this.props.fetchAccountInfo();
    }

    handleLogout = () => {
        this.props.logout();
        history.push('/');
    }
 */
    render() {
        //const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
        const { login, logout, isAuthenticated } = this.props.auth;

        const showNavLinks = (
            <div className="container-fluid">
                <Fragment>
                    <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
                    {isAuthenticated() ? (
                        <Fragment>
                            <Nav.Link
                                className="btn-right"
                                onClick={() => logout()}
                            >
                                Logout
                            </Nav.Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Nav.Link
                                className="btn-right"
                                onClick={() => login()}
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

export default NavBar;
