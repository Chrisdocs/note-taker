// dependecies
const express = require('express');
const fs = require('fs');
const path = require('path');
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
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

let notes = []

app.post('/api/notes', (req, res) => {
    const addNote = req.body;
    let noteID = req.body.id;

    console.log('Recieved Data from client: ', addNote);
    console.log('Note id is: ', noteID);
    console.log('the array length is: ', notes.length);

    
    fs.writeFile('./db/db.json', JSON.stringify(addNote), (err) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < notes.length; i++) {
                if (noteID === notes.length)
                console.log('You are on note number: ', noteID)
                    noteID = noteID + 1;
            }
            notesArr = notes.push(addNote);
            console.log(notes);
        
            res.send('Note has been added');
            // iterate through the array checking the id number of the object, to each new object add array length + 1
        }
    })
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});