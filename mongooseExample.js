const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/test';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //това не е задължително, да ни принти грешка в конзолата, ако има такавал

db.once('open', ()=>{
    console.log('Connected to database!'); //това не е задължително, да разберем, че базата е включена
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Person = mongoose.model('Person', personSchema); //името на нашия модел и схемата

//Make new insance of our model and saving
let person = new Person({name: 'Petkan', age: 26});

//First way
// person.save((err, result)=>{
//     if (err) {
//         return console.log(err);
//     }
//     console.log(result);
// });


//Second way - with promices
person.save()
.then(result => {
    console.log(result);
})