//this file handles all the end points for the different paths

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuthentication = require('../authenticator/JSONAuth')

const Courses = require('../models/courses.js');


//set a limit variable for number of items
const limitItems = 5


//end point that returns all the courses in the database
router.get('/', async (req, res, err) =>{
    try{
        const data = await Courses.find().limit(limitItems);
        res.status(200).json(data)
    }
    catch (err){
        res.status(500).json({message: err})
    }
});

//end point that returns all different categories stored in the db
router.get('/categories', async (req, res, err) =>{
    try{
        const data = await Courses.find({Category: {$exists:true}});
        res.status(200).json(data)
    }
    catch (err){
        res.status(500).json({message: "No specific Categories in the db"})
    }
});

//end point that returns specific courses using the id
router.get('/:id', async (req, res, err) =>{
    const id = req.params.id
    try{
        const data = await Courses.findById(id);
        res.json(data)
    }
    catch (err){
        res.status(404).json({message: "Id does not exist"})
    }
});

//end point that returns specific courses based on the course collection category
router.get('/category/:category', async (req, res, err) =>{
    const category = req.params.category
    try{
        const data = await Courses.find({Category: req.params.category.toLowerCase()}).limit(limitItems)
        console.log(category)
        console.log(data)
        res.status(200).json(data)
    }
    catch (err){
        res.status(500).json({message: "Category of Items do not exist"})
    }
});

//end point that adds a new course
router.post('/newCourse', checkAuthentication, function(req, res, next) {
    try{
        Courses.create(req.body).then(function (course) {
            res.send("course has been successfully created " + course)
        }).catch(next); 
    }
    catch(err){
        res.status(500).json({Error: "Failed to create course"})
    };
});

//update existing course in courses
router.put('/update/:id', checkAuthentication, function(req, res) {
    try{
        Courses.findByIdAndUpdate({_id:req.params.id}, req.body).then(function () {
            Courses.findOne({_id: req.params.id}).then(function (course) {
                res.send(course);
        })
        });
    }
    catch(err){
        res.status(500).json({Error: "Failed to update"})
    };
});

//delete course from courses
router.delete('/delete/:id', checkAuthentication, (req, res) => {
    try {
        Courses.findByIdAndRemove({_id:req.params.id}).then( (course) => {
            if (course){
                res.send(`Course ${course.courseTitle} has been successfully deleted`)
            }else{
                res.status(404).send(`Course not be found`)
            }
        });
    }
    catch(err){
        res.status(500).json({Error: "Failed to delete"})
    };
});

module.exports = router;