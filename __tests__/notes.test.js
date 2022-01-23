const fs = require('fs');
const { updateNotes, deleteNote } = require('../lib/notes');
const notes = require('../db/db');

// tests if the json file is present for manipulation
test('Notes object was imported from JSON file', () => {
  const note = notes[1];

  expect(note.title).toEqual(expect.any(String));
  expect(note.text).toEqual(expect.any(String));
  expect(note.id).toEqual(expect.stringContaining('-'));
});
// tests if a new note was added to the notes array
test('Note is successfully added to notes array', () => {
  const newNote =
  {
    "title": "Call Bank",
    "text": "- Call bank on Friday about deposit"
  }
  let index = notes.length
  updateNotes(newNote, notes);
  expect(notes[index].title).toBe("Call Bank");
  expect(notes[index].text).toBe("- Call bank on Friday about deposit");
  expect(notes[index].id).toEqual(expect.stringContaining('-'));
});
// tests if the notes array with the new note is written to the json file
test('Note was successfully written to db.json', () => {
  const addedNote = notes.slice(-1).pop();

  expect(addedNote.title).toBe("Call Bank");
  expect(addedNote.text).toBe("- Call bank on Friday about deposit");
  expect(addedNote.id).toEqual(expect.stringContaining('-'));
});
// tests if note was deleted from notes array and the updated array written to the json file
test('Note was successfully deleted from notes array and db.json', () => {
  const addedNoteId = notes.slice(-1).pop().id;

  const beforeDelete = notes.length;
  deleteNote(addedNoteId, notes);
  const afterDelete = notes.length

  expect(beforeDelete).toBeGreaterThan(afterDelete);
  expect(notes.filter(removedNote => removedNote.id === addedNoteId)).toStrictEqual([])
});