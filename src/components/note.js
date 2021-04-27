import React, { Component } from 'react';
import { Map } from 'immutable';
import Draggable from 'react-draggable';
import marked from 'marked';
import EditNote from './edit_note';

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorVisible: false,
        };
    }

    // Remove/delete by ID
    onRemove = () => {
        this.props.onDelete(this.props.id);
    }

    onReposition = (e, data) => {
        const position = this.props.notePos;
        const movedTo = Map({
            x: position.get('x') + data.deltaX,
            y: position.get('y') + data.deltaY,
            z: position.get('z'),
        });
        this.props.onDragNote(this.props.id, movedTo);
    }

    toggleEditorVisibility = () => {
        this.setState((prevState) => ({
            editorVisible: !prevState.editorVisible,
        }));
    }

    reviseNote = (title, content) => {
        this.props.onEdit(this.props.id, title, content);
        this.toggleEditorVisibility();
    }

    // EditNote component
    openEditor() {
        const revised = (
            <EditNote
                show={this.state.visibility}
                title={this.props.noteTitle}
                content={this.props.noteContent}
                onUpdateNote={this.reviseNote}
                exitNote={this.toggleEditorVisibility}
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
                    grid={[10, 10]}
                    defaultPosition={{ x: 0, y: 0 }}
                    bounds="body"
                >
                    <div className="note">

                        <div className="options">

                            <div className="note_title">
                                {this.props.noteTitle}
                            </div>

                            <div className="clickable_options">
                                <i role="button" aria-label="Delete note" tabIndex={0} className="fas fa-trash-alt" onClick={this.onRemove} />
                                <i role="button" aria-label="Edit note" tabIndex={0} className="fas fa-edit" onClick={this.toggleVisibility} />
                                <i className="fas fa-arrows-alt" />
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
