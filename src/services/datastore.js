import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDbhvJ9CxTW8oa7QC2bKp3I6HBBKXwDhtc',
    authDomain: 'react-notes-51a8f.firebaseapp.com',
    databaseURL: 'https://react-notes-51a8f-default-rtdb.firebaseio.com',
    projectId: 'react-notes-51a8f',
    storageBucket: 'react-notes-51a8f.appspot.com',
    messagingSenderId: '871674538395',
    appId: '1:871674538395:web:86eecdf55975b4f737193e',
    measurementId: 'G-H8LV1MJENH',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Starter code from instructions
export function fetchNotes(callback) {
    firebase.database().ref('notes').on('value', (snapshot) => {
        const newNotes = snapshot.val();
        callback(newNotes);
    });
}

// Code from instructions
export function deleteNote(id) {
    firebase.database().ref('notes').child(id).remove();
}

export function createNote(title) {
    const newNote = {
        content: '',
        title,
        position: { x: 0, y: 0, z: 0 },
    };
    const noteKey = firebase.database().ref('notes').push(newNote);
    return noteKey;
}

export function dragNote(id, position) {
    firebase.database().ref('notes').child(id).update({
        position,
    });
}

export function editNote(id, title, content) {
    const edited = {
        title,
        content,
    };
    firebase.database().ref('notes').child(id).update(edited);
}
