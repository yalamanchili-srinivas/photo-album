/**
 * Created by srini on 27/3/17.
 */
'use strict';
const readChunk = require('read-chunk');
const fileType = require('file-type');

module.exports.findMimeType = function(filePath) {
    let buffer = readChunk.sync(filePath, 0, 4100);

    let mime_type = fileType(buffer);

    console.log('Mime type: ' + mime_type);

    return mime_type;
};

module.exports.isJpegFile = function() {

}
