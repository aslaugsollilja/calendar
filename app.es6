'use strict';
var Calendar = require('./calendar');
var Day = require("./day");
var director = require('director');;
var calendarTemplate = require('calendar.handlebars');
var eventsTemplate = require('dayEvents.handlebars');
var myService = require('./serviceInstance');


var $mainContainer = $("#mainContainer");

var routes = {
	'/' : function(){ new Calendar() },
	'/events' : function() { new Day() }
};

var router = director.Router(routes);
router.init();

new Calendar();