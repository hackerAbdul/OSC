const http = require('http')
const app = require('./app')
const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3000



// console.log(process.env.test);

mongoose.connect(`mongodb+srv://abdulkadirq12:${process.env.DB_PASS}@cluster0.nx4qips.mongodb.net/test?retryWrites=true`,{
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;



app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));

// app.get('/', (req, res) =>{
//     response = res.send(`App is running on port ${PORT}`)
// })