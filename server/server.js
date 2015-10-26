var express = require('express');
var app = express();
var path = require('path');
var messageController = require('./messages/messageController');


app.use(express.static(path.join(__dirname, './../client')));


// to remove
app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.postMessage);


app.listen(3000);