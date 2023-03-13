const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile, } = require('../helpers/fsUtils');

//http://localhost:3001/api/notes/
api.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

// GET route for a specific note
api.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

//DELETE route for a specific note
api.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            const result = json.filter((note) => note.note_id !== noteId);



            writeToFile('./db/db.json', result);


            res.json(`Note ${noteId} has been deleted`);

        });
});

// POST route to create a new note
api.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const newNote = {

        note_id: uuidv4(),
        title, text
    };


    const parsedData = readAndAppend(newNote, './db/db.json');
    res.json(parsedData);

});

module.exports = api;