const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// ======== Server operations functions ======== \\
// Write data to db.json file
const writeToFile = notes => {
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes, null, 2)
  );
};
// Update notes with a new note in db.json
const updateNotes = (newNote, notes) => {
  newNote.id = uuidv4();
  notes.push(newNote);
  writeToFile(notes);
  return notes;
};
// Delete a note in db.json
const deleteNote = (id, notes) => {
  const noteIndex = notes.findIndex(note => note.id == id);
  notes.splice(noteIndex, 1);
  writeToFile(notes);
  return notes;
};
// Export functions for use
module.exports = {
  updateNotes,
  deleteNote
};