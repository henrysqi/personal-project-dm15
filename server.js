var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var connString = require('./config')
