const express = require('express');
const router = express.Router();

const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/controller');

// POST route for generating a new short URL
router.post('/url', handleGenerateNewShortURL);

// GET route for retrieving analytics of a specific short URL
router.get('/analytics/:shortId', handleGetAnalytics);

// GET route for retrieving analytics (if you want to get overall analytics or all URLs)
router.get('/analytics', handleGetAnalytics);

module.exports = router;
