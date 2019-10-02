const express = require('express');
const app = express();
const path = require('path');
const messageController = require('./messages/messageController');
const authController = require('./utils/authController');
const bodyParser = require('body-parser');
const success = require('./utils/success');
const error = require('./utils/error');
const denied = require('./utils/denied');

app.use(express.static(path.join(__dirname, './../client')));
app.use(bodyParser.json());

// place routes here
app.get('/messages',messageController.getMessages);


app.post('/messages',function(req,res,next){
    //console.log(req.body);
    if (typeof req.body.message === 'string' && typeof req.body.created_by === 'string'){
        if (req.headers.authorization !== 'Basic secret_key') {
            res.send(denied);
         } else {res.send(success);
                next();}
    } else {
        res.status(400).send(error);
    }
},messageController.postMessage);

app.listen(3000);

module.exports = app;
