'use strict';
var Calendar = require('./calendar');

var director = require('director');;
var calendarTemplate = require('calendar.handlebars');
var eventsTemplate = require('dayEvents.handlebars');
var newEventTemplate = require('newEvent.handlebars');
var myService = require('./serviceInstance');


var $mainContainer = $("#mainContainer");

var routes = {
	'/' : function(){ $mainContainer.html(calendarTemplate)},
	'/new' : function() { $mainContainer.html(newEventTemplate)},
	'/events' : function() { $mainContainer.html(eventsTemplate)}
};

var router = director.Router(routes);
router.init();

new Calendar();