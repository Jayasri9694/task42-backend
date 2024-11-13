const mongoose = require('mongoose');
const shortid = require('shortid');  // This is optional, for generating unique short IDs

// Define the schema for the short URL
const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }  // Track visits to the shortened URL
});

// Create the model for short URLs
const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
