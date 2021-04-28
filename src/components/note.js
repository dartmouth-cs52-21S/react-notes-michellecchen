import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import EditNote from './edit_note';

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = { editorVisible: false };
    }

    onRevise = (title, content) => {
        this.props.onEdit(this.props.id, title, content);
        this.toggleEditorVisibility();
    }

    // Remove/delete by ID
    onRemove = () => { this.props.onDelete(this.props.id); }

    onReposition = (e, data) => {
        const position = this.props.noteCoordinates;
        const movedTo = {
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
            z: position.z,
        };
        this.props.onDragNote(this.props.id, movedTo);
    }

    // fixed
    toggleEditorVisibility = () => {
        this.setState((prevState) => ({ editorVisible: !prevState.editorVisible }));
    }

    // EditNote component
    openEditor() {
        const revised = (
            <EditNote
                title={this.props.noteTitle}
                content={this.props.noteContent}
                show={this.state.editorVisible}
                onUpdateNote={this.onRevise}
                closeEditor={this.toggleEditorVisibility}
            />
        );
        return revised;
    }

    render() {
        return (
            <div className="note_main">
                <Draggable
                    onDrag={this.onReposition}
                    handle=".fa-arrows-alt"
                    grid={[15, 15]}
                    position={{
                        x: this.props.noteCoordinates.x,
                        y: this.props.noteCoordinates.y,
                       }}
                    defaultPosition={{ x: 15, y: 15 }}
                    bounds="body"
                >
                    <div className="note">

                        <div className="options">

                            <div className="note_title">
                                {this.props.noteTitle}
                            </div>

                            <div className="clickable_options">
                                <i className="fas fa-arrows-alt" />
                                <i role="button" aria-label="Edit note" tabIndex={0} className="fas fa-edit" onClick={this.toggleEditorVisibility} />
                                <i role="button" aria-label="Delete note" tabIndex={0} className="fas fa-trash-alt" onClick={this.onRemove} />
                            </div>

                        </div>

                        <div className="content_main">
                            { /* eslint-disable-next-line react/no-danger */ }
                            <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.noteContent) }} />
                        </div>

                    </div>

                </Draggable>

                {this.openEditor()}

            </div>
        );
    }
}

export default Note;
