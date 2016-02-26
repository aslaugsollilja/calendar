'use strict';
var Calendar = require('./components/calendar');
var Day = require("./components/day");
var director = require('director');;
var calendarTemplate = require('calendar.handlebars');
var eventsTemplate = require('dayEvents.handlebars');
var myService = require('./services/serviceInstance');


var $mainContainer = $("#mainContainer");

var routes = {
	'/' : function(){ new Calendar() },
	'/events' : function() { new Day() }
};

var router = director.Router(routes);
router.init();

new Calendar();