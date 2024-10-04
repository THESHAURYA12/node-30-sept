const express = require('express');
const connect = require('./connection');
const user = require('./routes/user')
const path= require('path');
const app = express();
connect();
app.use(user);
app.set('view engine','ejs');
app.set('views', path.resolve('./views'));




app.listen(3000, (err) => {
    if (err) {

    } else {
        console.log("server is running on 3000....")
    }
})