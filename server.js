const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const writeToFile = notes => {
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2)
  );
}

const updateNotes = (newNote, notes) => {
  const note = newNote;
  notes.push(note);
  writeToFile(notes)
  return notes;
};

const deleteNote = (id, notes) => {
  const noteIndex = notes.findIndex(note => note.id == id);
  notes.splice(noteIndex, 1);
  writeToFile(notes)
  return notes;
};

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.delete('/api/notes', (req, res) => {
  const newNotes = deleteNote(req.query.id, notes);

  res.json(newNotes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();

  const note = updateNotes(req.body, notes);

  res.json(note);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log(`http://localhost:${PORT}`);
});