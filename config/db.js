const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/catagram';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //това не е задължително, да ни принти грешка в конзолата, ако има такавал

db.once('open', () => {
    console.log('Connected to database!'); //това не е задължително, да разберем, че базата е включена
});