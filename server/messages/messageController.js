const messages = require('./../../data/messages');
const bodyParser = require('body-parser');
//const success = require('./data/server/messages/utils/success');
//const error = require('./../../data/messages');
//const inter = messages;
//let obj = [];

module.exports = {
  getMessages: (request,response) => {
    // write code here
    response.send(messages);
 
  },
  postMessage: (request,response) => {
    // write code here
    //messages.push(request.body);
    if (typeof request.body === "object" && request.body.message && request.body.created_by){
      messages.push(request.body);
      response.status(200).send({success: "Your POST request was successful"});
    } else {
      response.status(400).send({error : "Your POST request was unsuccessful"})
    }

  }
};
