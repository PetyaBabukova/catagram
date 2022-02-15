const express = require('express');
const { engine } = require('express-handlebars'); //това ни връща нещо като мидълуер - хендълбарс, който да ползваме за апликейшъна
const bodyParser = require('body-parser');

const checkCatIdMiddleware = require('./middlewares/middleware');
const logger = require('./middlewares/loggerMiddleware');
const cats = require ('./cats.js') 

const app = express();


// app.use('/static', express.static('public')); //На този раут ползвай мидълуера екпрес статик и папка публик e достъпна на този раут. Внимание - като се линква цсс-а, трябвада се слага или да не се срага /static в зависимост от това кой от двата метода ползваме. 7 и 8 ред в html файла.

app.use(express.static('public')); //Всичко в папка пъблик е публично достъпно

app.use(logger);

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('hbs', engine({
    extname: 'hbs'
})); //тук може да се зададат в скобките различни настройки за енджина под формата на обект
app.set('view engine', 'hbs');
// app.set("views", "./views");

app.get('/', (req, res) => {
    let name = "Pesho";

    res.render('home', { name });
});

//  app.get('/download', (req, res)=>{
//      res.download('./views/home.html');
//  });

// app.get('/download', (req, res) => {
//     res.attachment('./public/index.html');
//     res.end();
// });


app.get('/cats', (req, res) => {
    res.render('cats', {cats: cats.getAll()})
});

app.post('/cats', (req, res) => {
    console.log(req.body);

    let catName = req.body.cat;

    cats.add(catName);

    res.redirect('/cats');

    // res.status(201).send('Cat created'); //може да се чейнват
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


app.all('/', (req, res) => {
    console.log('handle all requests');
    res.end();
});


app.listen(5000, () => console.log('Server is listening on port 5000')); 