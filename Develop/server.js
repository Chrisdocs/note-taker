const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3001;

const writeFileWhen = util.promisify(fs.writeFile);
const readFileWhen = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/js/index.js'))
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

let notes;

app.post('/api/notes', (req, res) => {
    var addNote = req.bodWhen(path.join(__dirname, './db/db.json', 'utf8')
    .then( function (data) {
        notes = JSON.parse(data);
        if (notes.id || notes.id === 0) {
            let currentNote = notes[addNote.id];
            currentNote.title = addNote.title;
            currentNote.text = addNote.text;
        } else {
            notes.push(addNote);
        }
        fs.writeFileWhen(path.join(__dirname, './db/db.json'), JSON.stringify(notes))
        .then(function () {
            console.log('added note!')
        })
    })
    )
    res.json(addNote);
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});