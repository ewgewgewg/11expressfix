/**
 * Do not edit
 */

$(document).ready(function(e) {
  getMessage();
});

function getMessage() {
  $('#message-box').empty();
  $.get('./messages',function(data) {
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

