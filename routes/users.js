//this file handles all the end points for the different paths

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuthentication = require('../authenticator/JSONAuth')

const User = require('../models/users.js');

router.post('/signup', (req, res) =>{
    //validation to check if user already exists
    User.find({email: req.body.email}).then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                Error: "Email already exists"
            })
        }else{
            //encrypt password using bcrypt hash library 
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if (err){
                    return res.status(500).json({Error: err})
                }else{
                    //creat new user using the User model once hashed password is successful
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result =>{
                        console.log(`New User Created ${result}`)
                        res.status(200).json({
                            message: "user has been created"
                        })
                    }).catch(err =>{
                        res.status(500).json({
                            message: err
                        })
                    });
                }
            })
        }
    });
});


router.post('/login', (req, res) =>{
    User.find({email: req.body.email}).then(user =>{
        //if users do not exist throw error for invalid authentication
        if(user.length < 1){
            return res.status(401).json({
                Error: "Authentication has failed"
            })
        }else{
            //compare encrypted password from the user signup 
            bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
                if (err){
                    return res.status(401).json({
                        Error: "Authentication has failed"
                    })
                };

                if (result===true && req.body.email === "admin@gmail.com"){
                    const token = jwt.sign({
                        email: user[0].email
                    }, 
                    process.env.JWT_KEY,
                    {
                        //Set expiration of json token to be for 30 mins inactivity
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: "Successful Admin Login",
                        token: token
                    })
                }
                //if the passwords match pass validation
                else if(result){
                    const token = jwt.sign({
                        email: user[0].email
                    }, 
                    process.env.JWT_KEY,
                    {
                        //Set expiration of json token to be for 30 mins inactivity
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: "Successful User Login",
                    })
                }else{
                    return res.status(401).json({
                        Error: "Authentication has failed"
                    })
                }
            });
        };
    });
});



module.exports = router