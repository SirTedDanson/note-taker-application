const path = require("path");
const router = require('express').Router();

// ======= Front end HTML routes ======= \\
// Server root, homepage route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// Route to notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});
// Wildcard route for undefined route calls
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;