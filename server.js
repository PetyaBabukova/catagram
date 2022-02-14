const express = require('express');

const checkCatIdMiddleware = require('./middlewares/middleware')

const app = express();

const cats = [];

app.get('/', (req, res) => {
    console.log("Hello from console");
    res.send('Hello world from express!')
});

//  app.get('/download', (req, res)=>{
//      res.download('./views/home.html');
//  });

// app.get('/download', (req, res) => {
//     res.attachment('./views/home.html');
//     res.send('File has been send');
// });

app.get('/download', (req, res)=>{
    // res.sendFile(__dirname + '/views/home.html') //тук трябва да се сложи абсолютен път!
    res.sendFile('./views/home.html', { root: __dirname}); // може и така Ве едното ива точка в другото няма - в пътя!
});


// app.get('/cats', (req,res)=>{
//     res.send('Some cute cats')
// });

// app.get('/cats', (req,res)=>{
//     res.json([
//         'Navcho',
//         'Gary',
//         'Mishi',
//     ]);
// });

// app.get('/cats', (req, res) => {
//     res.redirect('/');
// });

app.get('/cats/:catId?', checkCatIdMiddleware, (req, res) => {
    // if (!/\d+/.test(req.params.catId)) {
    //     res.status(404).send('You need to specify cat id number');
    //     return; //много е важно да има ретърн, защото иначе се опитва втори път да сендва след иф-а и излиза грешка при тру на иф-а. Доста често срещата грешка
    // }
    // console.log(req.params);
    res.send(`You are looking at profile of ${req.params.catId}`)
})

app.post('/cats', (req, res) => {
    console.log('Create cat');

    res.status(201).send('Cat created'); //може да се чейнват
});

app.all('/', (req, res) => {
    console.log('handle all requests');
    res.end();
});


app.listen(5000, () => console.log('Server is listening on port 5000')); 