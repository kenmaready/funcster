import React, { Component, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import history from '../history';

export class NavBar extends Component {

/*     componentDidMount() {
        this.props.fetchAccountInfo();
    }

    handleLogout = () => {
        this.props.logout();
        history.push('/');
    }
 */
    render() {
        const showNavLinks = (
            <div className='container-fluid'>
            <Fragment>
                <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>   
                <Nav.Link onClick={() => history.push('/login')}>Login</Nav.Link>  
                {/* <Nav.Link onClick={() => history.push('/')}>Signup</Nav.Link>   */}
                {/* <span className="navbar-user-info">
                    <Navbar.Text className="navbar-user-item">User: {this.props.accountInfo.username}</Navbar.Text>
                    <Navbar.Text className="navbar-user-item">Balance: {this.props.accountInfo.balance} Crowns</Navbar.Text>
                </span> */}
            </Fragment>
            </div>
        );

        return (
            <div>
                <Navbar bg='primary' variant='dark' expand='lg' fixed='top'>
                    <Navbar.Brand >{'</> funcster'}</Navbar.Brand>
                    <Nav className='mr-auto'>
                    {showNavLinks}
                    {/* {this.props.account.loggedIn && showNavLinks} */}
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;