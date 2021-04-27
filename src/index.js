import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import NotesGroup from './components/notes_group';
import AddNote from './components/add_note';

class App extends Component {
    constructor(props) {
        super(props);

        // Using an immutable map to (1) quicken deletion/updates, (2) refactor for Firebase,
        // (3) work with Immutable.js, and (4) save us from making mistakes later w/ app state.
        this.state = {
            notes: Map(),
            key: 0,
        };
    }

    // CREATE A NEW NOTE (add it to the Map of Notes, starting at position 0,0,0)
    createNote = (title) => {

        // Cloning
        const position = Map({
            x: 0,
            y: 0,
            z: 0,
        });

        const { key } = this.state;

        const value = Map({
            content: '',
            title,
            position,
        });

        // Ref'd from instructions
        this.setState((prevState) => ({
            notes: prevState.notes.set(key, value),
            key: prevState.key + 1,
        }));
    }

    // DELETE AN EXISTING NOTE (remove it from the Map of Notes)
    deleteNote = (id) => {
        // Ref'd from instructions
        this.setState((prevState) => ({
            notes: prevState.notes.delete(id),
        }));
    }

    // EDIT AN EXISTING NOTE (change its title/content)
    editNote = (id, title, content) => {

        // consider merging
        const position = this.state.notes.getIn([id, 'position']);
        const mapInit = Map({ title, content, position });

        // Update -- ref'd from instructions
        this.setState((prevState) => ({
            notes: prevState.notes.set(id, mapInit),
        }));
    }

    // DRAG AN EXISTING NOTE (change its position)
    moveNote = (id, position) => {

        this.setState((prevState) => ({
            notes: prevState.notes.setIn([id, 'position'], position),
        }));
    }

    render() {
        return (
            <div>
                <h1>Communal notes space</h1>
                <AddNote handleAdd={this.createNote} />
                <NotesGroup
                    notesMap={this.state.notes}
                    onEditNote={this.editNote}
                    onDragNote={this.moveNote}
                    onDelete={this.deleteNote}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('main'));
