const express = require("express");
const app = express();

const courseRoute = require('./routes/courses');
const userRoute = require('./routes/users');

app.use(express.json());

app.use('/courses', courseRoute);
app.use('/users', userRoute);

app.get('/', (req, res) =>{
    response = res.send(`App is running on port ${PORT}`)
})

module.exports = app;