const router = require('express').Router();
const { updateNotes, deleteNote } = require('../../lib/notes');
const notes = require('../../db/db');

// ======= Back end API calls ======= \\
// Get data from db.json
router.get('/notes', (req, res) => {
  res.json(notes);
});
// Delete data based on ID from db.json
router.delete('/notes', (req, res) => {
  const newNotes = deleteNote(req.query.id, notes);

  res.json(newNotes);
});
// Add new data to db.json
router.post('/notes', (req, res) => {
  const note = updateNotes(req.body, notes);

  res.json(note);
});

module.exports = router;