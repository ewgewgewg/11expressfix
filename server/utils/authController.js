const deniedObj = require('./denied');

module.exports = function(request, response,next) {
    if (request.headers.authorization !== undefined && request.headers.authorization === 'Basic secret_key'){
        next();
    } else {
        response.status(400).send(JSON.stringify(deniedObj));
        response.end();
    }

}
