import React, { Component } from 'react';
import SnippetEditor from '../components/SnippetEditor';
import '../css/prism.css';

export class snippet extends Component {
    render() {
        return (
            <div>
                <SnippetEditor />
            </div>
        )
    }
}

export default snippet
