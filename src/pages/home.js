import React, { Component, Fragment } from 'react'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { Auth0Context } from '../react-auth0-spa';
import history from '../utils/history';

class home extends Component {
    static contextType = Auth0Context;

    render() {
        const { isAuthenticated, user, loading } = this.context;
        return (
            <div className="main-page container-fluid"> 

                    {!loading && !isAuthenticated && (
                        <Fragment>
                            <h2>{'welcome to funcster...'}</h2>
                            <div className='spacer' />
                            <p>funcster is a snippet library and reviewing platform for python functions and classes. Store your functions and classes in a searchable library, and get a mentor to review and edit your code.</p>
                            <h4>sign up and get started!</h4>
                            <div className='spacer' />
                            <ButtonGroup className='signup-btns'>    
                                <Button variant='outline-primary' onClick={() => history.push('/signup/coder')}>I'm a Coder</Button>
                                <Button className="btn-right" variant='outline-secondary' onClick={() => history.push('/signup/mentor')}>I'm a Mentor</Button>
                            </ButtonGroup>
                        </Fragment>
                    )}

                    {!loading && isAuthenticated && (
                        <Fragment>
                            <h4>{`welcome back, ${user.nickname}`}</h4>
                        </Fragment>
                    )}

            </div>
        )
    }
}

export default home;