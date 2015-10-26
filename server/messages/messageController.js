var messages = require('./../../data/messages');

module.exports = {
  getMessages: function(request, response) {

    // to remove
    response.send(messages);


  },
  postMessage: function(request,response) {



  }
};