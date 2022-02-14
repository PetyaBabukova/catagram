const express = require('express');

const checkCatIdMiddleware = require('./middlewares/middleware');
const logger = require('./middlewares/loggerMiddleware');

const app = express();

const cats = [];

// app.use('/static', express.static('public')); //На този раут ползвай мидълуера екпрес статик и папка публик e достъпна на този раут. Внимание - като се линква цсс-а, трябвада се слага или да не се срага /static в зависимост от това кой от двата метода ползваме. 7 и 8 ред в html файла.

app.use(express.static('public')); //Всичко в папка пъблик е публично достъпно

app.use(logger);

app.get('/', (req, res) => {
    res.send('index page')
    // res.sendFile(__dirname + '/views/home.html') //тук трябва да се сложи абсолютен път!
    // res.sendFile('./views/home.html', { root: __dirname}); // може и така Ве едното има точка в другото няма - в пътя!
});

//  app.get('/download', (req, res)=>{
//      res.download('./views/home.html');
//  });

app.get('/download', (req, res) => {
    res.attachment('./views/home.html');
    res.end();
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