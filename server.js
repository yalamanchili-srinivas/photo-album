/**
 * Created by srini on 23/3/17.
 * An app.js for configuring the application,
 * a db.js for specifying the connection to the database, and
 * a server.js for spinning up the node server on a specific port of your choice.
 */


'use strict';

var config = require('./conf');
var app = require('./app');

var port = process.env.PORT || config.port || 9000;

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});