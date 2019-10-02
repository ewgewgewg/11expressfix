const messages = require('./../../data/messages');
const bodyParser = require('body-parser');
//const inter = messages;
//let obj = [];
let i = 0;

module.exports = {
  getMessages: (request,response) => {
    // write code here
    response.send(messages);
 
  },
  postMessage: (request,response) => {
    // write code here
    //messages = messages.concat()
    //let obj = {message : request.text.message, created_by : request.text.created_by}
    // console.log(request.text);
    // inter.push(request.text);
    console.log(request.body);
    console.log(messages);
    messages.push(request.body);
    //console.log("hi", JSON.parse(response.body), "ho");
    console.log(i);
    i++;

  }
};
