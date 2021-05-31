// dependecies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// const util = require('util');
// create express server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET * should return the index.html file.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './db/db.json'));
});

let notes = []

app.post('/api/notes', (req, res) => {
    const addNote = req.body;
    notesArr = notes.push(addNote)
    notesArrStr = JSON.stringify(notesArr);

    // console.log('Recieved Data from client: ', addNote);
    // console.log('Note id is: ', noteId);
    // console.log('the array length is: ', notes.length);

    for (let i = 0; i < notes.length; i++) {
    if (notes.length) {
        // console.log('HEARD THIS!!')
        // console.log('if statement: ', noteId++);
        addNote.id = uuidv4();
        }
    }
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < notes.length; i++) {
                fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', (err) => {
                    if (err) {
                        console.log(err) 
                    } else {
                        console.log('Your array contains: ', notes);
                        res.send({sucess: true});
                    }
                })
            }
        }
    })
})




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});