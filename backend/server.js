const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Get cafes near a location using Google Places API
app.get('/api/cafes', async (req, res) => {
    try {
        const { lat, lng } = req.query; // Get location from frontend
        
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&key=${API_KEY}`;
        
        console.log('🔑 Calling Google Places API...');
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('✅ Places API response:', data.status);
        console.log('📍 Number of cafes found:', data.results.length);
        
        res.json(data);
        
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});