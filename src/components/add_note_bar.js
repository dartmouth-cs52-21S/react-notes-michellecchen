import React, { Component } from 'react';

class AddNoteBar extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    handleTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    onCreate = (e) => {
        this.props.handleAdd(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return (
            <div id="add_note">
                <input onChange={this.handleTitle} value={this.state.title} />
                <button type="button" id="add_note_btn" onClick={this.onCreate}>
                    Create new note!
                </button>
            </div>
        );
    }
}

export default AddNoteBar;
