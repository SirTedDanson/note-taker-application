const fs = require('fs');
const path = require('path');
const express = require('express');
const notes  = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

function findById(id, notes) {
  const result = notes.filter(note => note.id === id)[0];
  return result;
};

function createNewNote(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify(notes, null, 2)
  );

  return note;
}

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();

  const note = createNewNote(req.body, notes);

  res.json(note);
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  console.log(`http://localhost:${PORT}`);
});