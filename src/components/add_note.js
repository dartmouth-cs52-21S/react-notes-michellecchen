import React, { Component } from 'react';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    handleTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    // handleContent = (e) => {
    //     this.setState({ content: e.target.value });
    // }

    onCreate = (e) => {
        this.props.handleAdd(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return (
            <div id="add_note">
                <h2>Title:</h2>
                <input onChange={this.handleTitle} value={this.state.title} />
                {/* <h2>Content:</h2>
                <input onChange={this.handleContent} value={this.state.content} /> */}
                <button type="button" id="add_note_btn" onClick={this.onCreate}>
                    Create new note!
                </button>
            </div>
        );
    }
}

export default AddNote;
