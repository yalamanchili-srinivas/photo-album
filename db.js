/**
 * Created by srini on 23/3/17.
 */
'use strict';

var mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/photo_app';

mongoose.connect(DB_URL);