const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 3000;
const password = "Gzilt5phwcuIcSVK";
const dbURL = `mongodb+srv://ranjith05chris:${password}@student-networking.al2y5ir.mongodb.net/?retryWrites=true&w=majority&appName=student-networking`;

app.use(bodyParser.json());

mongoose.connect(dbURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api', require('./routes/api'));


http.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});