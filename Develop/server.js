// dependecies
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
// create express server
const app = express();
const PORT = process.env.PORT || 3001;

const writeFileWhen = util.promisify(fs.writeFile);
const readFileWhen = util.promisify(fs.readFile);

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
