const express = require('express');
const router = express.Router();
const {getServer, postContact, pingServer} = require('../Controller/controllerpost.js');

// Get Server Test
router.get('/hello',getServer);

// Ping endpoint to wake up server
router.get('/api/ping', pingServer);

// Post
router.post('/api/contact',postContact );


module.exports = router;