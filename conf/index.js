'use strict';

var fs     = require('fs'),
    cjson  = require('cjson'),
    config = null;

console.log('Loading Configuration file.......... ');

function load() {
    var contents = fs.readFileSync('./conf/config.json', 'utf-8');

    return cjson.parse(contents);
}

if(config == null) {
    config = load();
}

console.log(config);

module.exports = config;
