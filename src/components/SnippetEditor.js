import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';

import history from '../utils/history';
import { BACKEND } from '../config';

class SnippetEditor extends Component {
    state = {
        code: '',
        coderId: 1,
        snippetName: '',
        needsReview: false,
        hasComments: true,
        comments: ''
    }

    handleChange = (event) => {
        if (event.target.name==='needsReview') {
            this.setState({ needsReview: !this.state.needsReview })
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${BACKEND}/coders/${this.state.coderId}/snippets`, {
            snippetName: this.state.snippetName,
            code: this.state.code,
            needsReview: this.state.needsReview
        })
        .then(response => {
            console.log('response received...')
            console.log(response)
            return {
                response: response
            };
        })
        .then( response => history.push("/"))
        .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="main-page">
                <Form>
                    <FormGroup controlId="formUsername">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={this.state.snippetName} 
                        name="snippetName"
                        onChange={this.handleChange} 
                        placeholder="enter a name for this code snippet" />
                    </FormGroup>
                    <FormGroup>
                    <Form.Label>Code Editor:</Form.Label>
                        <Editor 
                        className='snippet-editor'
                        value={this.state.code}
                        onValueChange={code => this.setState({ code })}
                        highlight={code => highlight(code, languages.python)}
                        padding={10}
                        style={{ fontFamilty: '"Fira code", "Fira Mono", monospace', fontSize: 12, }}
                        />
                    </FormGroup>

                    {this.state.hasComments && (
                    <Form.Group>
                        <Form.Label>
                            Your Mentor left you some comments on this code:
                        </Form.Label>
                        <Form.Control 
                            as='textarea'
                            readOnly
                            value={this.state.comments}
                            />
                    </Form.Group>
                    )}

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check 
                        type="checkbox" 
                        label="Needs review"
                        name="needsReview" 
                        checked={this.state.needsReview}
                        onChange={this.handleChange} />
                    </Form.Group>

                    <Button onClick={this.handleSubmit} variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
};

export default SnippetEditor;
