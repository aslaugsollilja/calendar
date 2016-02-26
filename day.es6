'use strict';
require('bootstrap-webpack');
require('style.css');
var moment = require('moment');
var eventsTemplate = require('dayEvents.handlebars');
var myService = require('./serviceInstance');


myService.saveEvent({date: "20/02/16", name: "My birthday"});
setTimeout(function(){
	console.log(myService.getEvents());
}, 10);

console.log("goodbye");

var $mainContainer = $("#mainContainer");

var currentMonth = moment();

class day {
	constructor() {
		this.render();
	}

	render(weekList, curMonth) {

		$mainContainer.html(eventsTemplate);
		this.addEventHandlers();
	}

	addEventHandlers() {


	}

}

module.exports = day;