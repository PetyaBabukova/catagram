const mongoose = require('mongoose');
const Person = require('./modules/Person')

const uri = 'mongodb://localhost:27017/test';

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //това не е задължително, да ни принти грешка в конзолата, ако има такавал

db.once('open', () => {
    console.log('Connected to database!'); //това не е задължително, да разберем, че базата е включена
});

//Make new insance of our model and saving
let person = new Person({ name: 'Georgi', age: 33 });

//First way
// person.save((err, result)=>{
//     if (err) {
//         return console.log(err);
//     }
//     console.log(result);
// });


//Second way - with promices
// person.save()
// .then(result => {
//     console.log(result);
// });

// Person.find({}) // returns promise
// .then((data)=> {
//     console.log(data);
// } )

// Person.find({})
// .then((people)=>{
//     people.forEach(x => x.getInfo()) // This method we made in Person.js. This method dont exist in database, it`s only som functionality over our data
// })

// Person.find({})
//     .then((people) =>  {
//         people.forEach(x => console.log(`${x.name} was born in ${x.birthYear}`));
//     })

// Some functions, comming from mongoose automatic

//findById
// Person.findById('6213c3745ad5ce2035aef7cc')
//     .then(res => {
//         console.log(res)
//     });

//updateOne, updateMany $set e оператор на монго, не на монгус. Възможен е и колбек синтаксис.
// Person.updateOne({ _id: '6213c3745ad5ce2035aef7cc' }, { $set: { age: 35 } })
//     .then(res => {
//         console.log(res);
//     })

// findByIdAndUpdate - комбинация от горните две

// https://mongoosejs.com/docs/queries.html - има и други

// remove, findByIdAndRemove !!!This is hard delete. The only way is backup.
// Person.remove({name: 'Stamat Ivanov'})
// .then(res => {
//     console.log(res);
// })

//Another example - change some dataq BUT!!!! here is 2 fetches. Using update or findByIdAndUpdate is the better way.
// Person.findById('6214f657cf54cbd84a07957c')
//     .then(person => {
//         person.name = 'Petar';
//         person.save();
//     });

// count with async sintaxis
async function runCount() {
    // let count = await Person.count();
    let count = await Person.count({age: {$gte: 33}}); //$gte = greater then or equal; $gt = greater then
    console.log(count);
}
// runCount();

//select 
// async function runSelect() {
//     let names = await Person.find().select('name');
//     // let names = await Person.find({}, {_id: 0, name: 1}) // get only data without id. This is mongo-style, no mongoose style 

//     console.log(names);

// }
// runSelect();

//sort 
async function runSort() {
    let names = await Person.find({}, {_id: 0, name: 1}).sort({age: 1}) // -1 - низходящ ред, 1 - възходящ ред

    console.log(names);

}
runSort();

//Пеиджиране
async function runSortwithLimitAndSkip() {
    let names = await Person.find({}, {_id: 0, name: 1}).sort({age: -1}).skip(10).limit(10) // -това означава: подреди ги по низходящ ред, сипни първите 10 и ми дай следващите 10
    
    //other posibilities
    // Person.find({})
    // 	.where('firstName').equals('gosho')
    // 	.where('age').gt(18).lt(65)
    // 	.sort({age:-1})
    // 	.skip(10)
    // 	.limit(10)
    
    console.log(names);

}
runSortwithLimitAndSkip();

