import React, { Component, Fragment } from 'react'

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import history from '../history';

class home extends Component {
    render() {
        return (
            <div className="main-page container-fluid"> 
                    <h2>{'welcome to funcster...'}</h2>
                    <br></br>
                    <p>funcster is a snippet library and reviewing platform for python functions and classes. Store your functions and classes in a searchable library, and get a mentor to review and edit your code.</p>
                    <h2>sign up and get started!</h2>
                    <div className='spacer'></div>
                    <ButtonGroup>    
                        <Button variant='outline-primary' onClick={() => history.push('/signup')}>I'm a Coder</Button>
                        <Button className="btn-right" variant='outline-secondary' onClick={() => history.push('/signup')}>I'm a Mentor</Button>
                    </ButtonGroup>
            </div>
        )
    }
}

export default home;