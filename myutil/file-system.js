'use strict';

var fs = require('fs');
var path = require('path');

var BUFFER_SIZE = 100000;

module.exports.move_file_sync = function(src, dest) {
    console.log('moving......\nSRC: ' + src + '\nDEST: ' + dest);

    var read_so_far, fdsrc, fddest, read;
    var buff = new Buffer(BUFFER_SIZE);

    fdsrc = fs.openSync(src, 'r');
    fddest = fs.openSync(dest, 'w');
    read_so_far = 0;

    do {
        read = fs.readSync(fdsrc, buff, 0, BUFFER_SIZE, read_so_far);
        fs.writeSync(fddest, buff, 0, read);
        read_so_far += read;
    } while(read > 0);

    fs.closeSync(fdsrc);
    fs.closeSync(fddest);
    return fs.unlinkSync(src);
};