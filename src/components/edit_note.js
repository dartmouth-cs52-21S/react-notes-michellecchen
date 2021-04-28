import React, { Component } from 'react';

class EditNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            content: props.content,
        };
    }

    // Exit editor -- make no changes
    exitOut = () => {
        this.props.closeEditor();
        this.setState({
            title: this.props.title,
            content: this.props.content,
        });
    }

    // Edit title
    editTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    }

    // Edit content
    editContent = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    // Push edits to title & content
    updateNote = () => {
        this.props.onUpdateNote(
            this.state.title,
            this.state.content,
        );
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="edit_note">

                <span role="button" aria-label="Exit editing note" tabIndex={0} onClick={this.exitOut} className="fas fa-times" />
                <h2>Edit your note!</h2>
                <h3>Title:</h3>
                <input onChange={this.editTitle} value={this.state.title} />
                <h3>Content:</h3>
                <textarea onChange={this.editContent} value={this.state.content} />
                <button type="button" onClick={this.updateNote}>Save changes</button>

            </div>
        );
    }
}

export default EditNote;
