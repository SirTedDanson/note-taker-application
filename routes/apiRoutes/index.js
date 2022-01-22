const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notesRoutes');

// index.js acts as a hub file for routing functions
router.use(notesRoutes);

module.exports = router;