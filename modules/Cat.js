const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const catSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    breed: String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
    }
});

module.exports = mongoose.model('Cat', catSchema);

// next we go in server.js

// monggos settings - we make them in a new file and directory - config/db.js