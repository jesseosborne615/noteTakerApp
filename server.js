const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
// this is an instance of EXPRESS WEB SERVER
const app = express();

// These two PARSE the INCOMING BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// where our static assest live
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});





app.get('/api/notes', (req, res) => {
   
    const jsonData = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
    const parsedData = JSON.parse(jsonData);
    res.send(parsedData);
})

app.post('/api/notes', (req, res) => {
    const jsonData = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
    const parsedData = JSON.parse(jsonData);
    
    
    let note = req.body
   
    note.id = uuidv4()
    console.log(note);
    parsedData.push(note);
    fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err, data) => {
        if(err) throw err
        console.log('Note Saved');
        res.json(parsedData);
    } )
})

// app.delete('/api/notes/:id', (req, res) => {
//     console.log(req.params.id)

//     let deleteNote = req.params.id

//     db.splice(deleteNote, 1)
//     fs.writeFile('./db/db.json', JSON.stringify(db), (err, data) => {
//         if(err) throw err
//         console.log('Note Saved');
//         res.json(db);
//     } )
// })









app.listen(PORT, () => {
    console.log("Server Running");
})