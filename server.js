const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(logger('dev'));
//
const users = require('./routes/users');
//
const notes = require('./routes/notes');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({extended:false}));
app.set('jwtSecretKey', 'kunciRahasia');
//
mongoose.connection.on('error',
    console.error.bind(console, 'MongoDB connection error')
    );
//
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res) => {
    res.json({"message": "Hello World"});
});
//
app.use('/users', users);

//
app.use('/notes', validateUser, notes);
//
function validateUser(req,res,next) {
    jwt.verify(req.headers['x-acces-token'],req.app.get('jwtSecretKey'),(err,decoded)=> {
        if (err) {
            res.status(401).json({status:"error", message:"Unauthorized", data:null});
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}
//
app.use((req, res, next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    console.log(err);
    if(err.status === 404) {
        res.status(404).json({message:"Not found"});
    } else {
        res.status(500).json({message:"Server error"});
    }
});

app.listen(3000, () => {
    console.log('Node server listening on port 3000');
});