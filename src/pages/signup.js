import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';

import history from '../utils/history';
import { BACKEND } from '../config';


class signup extends Component {
    state = {
        usertype: this.props.match.params.usertype
    }

    submitSignup = event => {
        event.preventDefault();
        axios.get(`${BACKEND}/`)
        .then(response => {
            console.log('response received...')
            console.log(response.data.message)
            return {
                response: response.data.message
            };
        })
        .then( response => history.push("/"))
        .catch(err => console.error(err))
    }

    render () {

        return (
            <div className="main-page container-fluid">
                <h2>{this.state.usertype} sign up...</h2>
                <Form>
                    <FormGroup controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="enter a username" />
                    </FormGroup>
                    <FormGroup controlId="formEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" placeholder="enter your email address" />
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="enter a password" />
                    </FormGroup>
                    <Button onClick={this.submitSignup} variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
};

export default withRouter(signup);