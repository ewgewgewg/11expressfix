/**
 * Do not edit
 */

$(document).ready(function(e) {
  getMessage();
  $('#message-button').on('click', function() {
    sendMessage();
  });
});

function getMessage() {
  $('#message-box').empty();
  $.ajax({
    type: 'GET',
    url: './messages',
    headers: {
      'Authorization': 'Basic secret_key'
    }
  })
  .done(function(data) {
    renderMessages(data);
    setTimeout(getMessage, 2000);
  });
}

function renderMessages(messages) {
  var $messages = $('<ol></ol>');
  for (var i = 0; i < messages.length; i++) {
    $messages.append('<li>' +messages[i].message +'<br>' +messages[i].created_by +'</li>');
  }
  $('#message-box').append($messages);
}

function sendMessage() {
  var message = $('#message').val();
  var created_by = $('#created_by').val();
  var obj = {};
  if (message) {
    obj.message = message;
  }
  if (created_by) {
    obj.created_by = created_by;
  }
  $.ajax({
    type: 'POST',
    data: obj,
    url: './messages',
    headers: {
      'Authorization': 'Basic secret_key'
  }}).then(function(data) {
    console.log(data);
  });

}