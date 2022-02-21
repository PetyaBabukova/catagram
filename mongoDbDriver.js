const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient; //Class - client for comunication between db and application

const uri = 'mongodb://localhost:27017'; //connection string

const client = new MongoClient(uri); //instance for this exactly application


// First way
// client.connect(err => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     let db = client.db('catagram'); 
//     let cats = db.collection('cats');

//     cats.findOne({}, (err, result)=> {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);
//         console.log(`The finded cat is ${result}`);
//     });

//     cats.find({}).toArray(function (err, items) {
//         // console.log(items);
//         for (let i = 0; i < items.length; i++) {
//             console.log(items[i].name);
            
//         }
//     })
// });


// Second way
// client.connect()
// .then(res => {
//     const db = client.db('catagram');
//     const cats = db.collection('cats');

//     return cats.findOne({})
// })
// .then(res =>{
//     console.log(res);
// })

// // return cats.find({}).toArray() //това е в случай, когато искаме всичките. с един е по-лесно
// // })
// // .then(res =>{
// //     console.log(res);
// // })

// Third way
async function run() {
    await client.connect();

    const db = client.db('catagram');
    const cats = db.collection('cats');

    let firstCat = await cats.findOne({});
    console.log(firstCat);

    let allCats = await cats.find({}).toArray();
    console.log(allCats);
}

run();