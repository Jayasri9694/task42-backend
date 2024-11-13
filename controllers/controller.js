const shortid = require('shortid');
const ShortUrl = require('../models/model.js');  // Import the ShortUrl model

// Handle generating a new short URL
const handleGenerateNewShortURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // If originalUrl is not provided, return an error
    if (!originalUrl) {
      return res.status(400).json({ error: "originalUrl is required" });
    }

    // Generate a unique short ID using shortid
    const shortId = shortid.generate();

    // Create a new short URL document
    const newUrl = new ShortUrl({
      originalUrl,
      shortId
    });

    // Save the new URL to the database
    await newUrl.save();

    // Send the response with the shortened URL details
    res.status(201).json({
      shortId,
      originalUrl,
      shortUrl: `http://localhost:5000/${shortId}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handle getting analytics for a short URL
const handleGetAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find the short URL document in the database
    const shortUrl = await ShortUrl.findOne({ shortId });

    if (!shortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment the visits count each time the short URL is accessed
    shortUrl.visits += 1;
    await shortUrl.save();

    // Respond with analytics information
    res.status(200).json({
      shortId: shortUrl.shortId,
      originalUrl: shortUrl.originalUrl,
      shortUrl: `http://localhost:5000/${shortUrl.shortId}`,
      visits: shortUrl.visits,
      createdAt: shortUrl.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
