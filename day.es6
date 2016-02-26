'use strict';
require('bootstrap-webpack');
require('style.css');
var moment = require('moment');
var eventsTemplate = require('dayEvents.handlebars');
var myService = require('./serviceInstance');


myService.saveEvent({date: "20/02/16", name: "My birthday"});


var $mainContainer = $("#mainContainer");

var currentMonth = moment();

class day {
	constructor() {
		this.render();
	}

	render(weekList, curMonth) {

		$mainContainer.html(eventsTemplate());
		this.addEventHandlers();
	}

	addEventHandlers() {
		$('.js-saveEvent').on('click', function(){
			var title = $("#eventTitle").val();
			var eventType = $('input[name=optionsRadios]:checked', '.js-eventType').val();
			var notes = $('#notesArea').val();

			var event = {date: "18/02/06", title: title, eventType: eventType, notes: notes};
			console.log(event);
			myService.saveEvent(event);

			// A poor solution
			$(".modal-backdrop").remove();

		});

	}

}

module.exports = day;