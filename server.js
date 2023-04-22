require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_CONNECTION_URL).then(() => {
    console.log("Database Connected")
}).catch(error => {
    console.log(error)
})

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));