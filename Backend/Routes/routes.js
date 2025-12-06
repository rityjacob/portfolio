const express = require('express');
const router = express.Router();
const {getServer, postContact} = require('../Controller/controllerpost.js');

// Get Server Test
router.get('/',getServer);

// Post
router.post('/api/contact',postContact );


module.exports = router;