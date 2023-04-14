const express = require("express");
const app = express();
const mongoose = require('mongoose');

const courseRoute = require('./routes/courses');
const userRoute = require('./routes/users');

mongoose.connect(`mongodb+srv://abdulkadirq12:OpenStudyCollege@cluster0.nx4qips.mongodb.net/test?retryWrites=true`,{
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(express.json());

app.use('/courses', courseRoute);
app.use('/users', userRoute);


module.exports = app;