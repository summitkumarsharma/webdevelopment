const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser = require('body-parser');
const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// DATABASE CONNECTIVITY SPECIFIC STUFF
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
})
app.get('/services', (req, res) => {
    res.status(200).render('services.pug');
})
app.get('/classinfo', (req, res) => {
    res.status(200).render('classinfo.pug');
})
const params = {
    'message': 'Data has been saved successfully into the database'
};
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        // res.status(200).send('This data has been saved successfully into the database');
        // res.status(200).send('This data has been saved successfully into the database');
        res.status(200).render('contact.pug', params);
        console.log(" Data has been saved successfully into the database");
    }).then(() => {
        res.status(400).send("Data has not been saved successfully into the database");
    })


})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});