import React from 'react';
import Note from './note';

const NotesGroup = (props) => {
    const notes = props.notesMap.entrySeq().map(([id, note]) => {

        return (

            <Note
                key={id}
                id={id}
                notePos={note.get('position')}
                noteTitle={note.get('title')}
                noteContent={note.get('content')}
                onEdit={props.onEditNote}
                onDragNote={props.onDragNote}
                onDelete={props.onDelete}
            />
        );
    });

    return (
        <div>
            <div className="notes">
                {notes}
            </div>
        </div>
    );
};

export default NotesGroup;
