const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);



var res = $.get('https://jsonplaceholder.typicode.com/photos');

const port = process.env.PORT || 3000;
var app = express();

app.use((req, res, next) => {
   fs.appendFile('server.log', new Date().toString() + '\n', (err) => {
       console.log(err);
   });
   next(); 
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title : 'Demo Web'
    });
});

app.listen(port, () => {
    console.log(`app running ... , port: ${port}`);
});