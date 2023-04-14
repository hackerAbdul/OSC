//setting up the structure for the database how items are added into the schema

const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    courseTitle: {type: String, required: true},
    courseDescription: {type: String, required: true},
    courseDuration: {type: String, required: true},
    courseOutcome: {type: String, required: true},
    Category: {type: String, required: true},
    __v: { type: Number, select: false}
});


module.exports = mongoose.model('Courses', coursesSchema);