const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    // name: {type: String, required: true, min length: 3}, // възможно е стойността да е обект с най различни пропъртита
    age: Number,
});

//Методи:
personSchema.methods.getInfo = function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`); //да не се ползват ароу функции, защото няма да имаме достъп до this
}

// Виртуални пропъртита - няма да бъдат запазени в базата, но по някаква причина искаме да ги има и те да имат гетър и сетър. Има начин да може виртуалните пропъртита да могат да се пращат в респонса, в схемата се слага нещо, което ивчо е забравил как точно се прави, някаква настройка
personSchema.virtual('birthYear') //да не се ползват ароу функции, защото няма да имаме достъп до this
.get(function () {
    return (2022 - this.age);
})
// .set(function () { //подаваме някаква функция, сетър
    
// })

// Пръпърти Валидейшън - можем да валидираме всичките данни една по една и евентуално да пускаме ерър месич.

// const Person = mongoose.model('Person', personSchema); //името на нашия модел и схемата

module.exports = mongoose.model('Person', personSchema); //името на нашия модел и схемата