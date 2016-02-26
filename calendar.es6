'use strict';
require('bootstrap-webpack');
require('style.css');
var moment = require('moment');
var calendarTemplate = require('calendar.handlebars');
var myService = require('./serviceInstance');


myService.saveEvent({date: "20/02/16", name: "My birthday"});
setTimeout(function(){
	console.log(myService.getEvents());
}, 10);


var $mainContainer = $("#mainContainer");

var currentMonth = moment();

class calendar {
	constructor() {
		this.render(currentMonth);
	}

	getWeekList(date) {
		var startDate = moment(date).startOf('month').startOf('week');
		var endDate = moment(date).startOf('month').startOf('week').add(6, 'weeks');

		var weekList = [];
		var dayList = [];

		var today = moment().startOf('day');

		while (!(startDate.isSame(endDate))) {
			var dateObject = {};
			dateObject.dateNr = startDate.date();
			dateObject.date = startDate.format('DD/MM/YY');
			var events = myService.getEvent(dateObject.date);

			if(events){
				dateObject.nrOfEvents = events.length;
				dateObject.events = events;
			}
			if (startDate.isSame(today)) {
				dateObject.today = true;
			}
			dayList.push(dateObject);
			if (dayList.length == 7) {
				weekList.push(dayList);
				dayList = [];
			}
			startDate.add(1, 'days');
		};
		return weekList;
	}

	render(curMonth) {
		var weekList = this.getWeekList(currentMonth);

		var calendarHeading = moment(curMonth).format('MMMM YYYY');
		$mainContainer.html(calendarTemplate({
			weekList: weekList,
			weekdays: [
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			monthAndYear: calendarHeading
		}));
		this.addEventHandlers();
	}

	addEventHandlers() {

		// When user hovers over date it changes color
		// Today is marked with a different color and will return to that color when not hovered
		$(".js-calendarDate").hover(function () {
			$(this).css("background-color", "#d7d7d7");
		}, function () {
			if ($(this).hasClass("thisIsToday")) {
				$(this).css("background-color", "#e5e5ff");
			} else {
				$(this).css("background-color", "white");
			}
		});

		// When user clicks right arrow he gets next month and the dates updates
		$("#rightArrow").click(x => {
			var addMonth = currentMonth.add(1, 'month');
			this.render(addMonth);

		});

		// When user clicks left arrow he gets previous month and the dates updates
		$("#leftArrow").click(x => {
			var subMonth = currentMonth.subtract(1, 'month');
			this.render(subMonth);

		});

		$(".calendarDate").click(function () {
			window.location.href = "/#/events";
		})
	}

}

module.exports = calendar;


