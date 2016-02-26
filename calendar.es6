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

console.log("goodbye");

var $mainContainer = $("#mainContainer");

var currentMonth = moment();

class calendar {
	constructor() {
		var weekList = this.getWeekList(currentMonth);

		this.render(weekList, currentMonth);
	}

	getWeekList(date) {
		var startDate = moment(date).startOf('month').startOf('week');
		var endDate = moment(date).startOf('month').startOf('week').add(6, 'weeks');

		var weekList = [];
		var dayList = [];

		var today = moment().startOf('day');

		while (!(startDate.isSame(endDate))) {
			//console.log(startDate);
			var dateObject = {};
			dateObject.dateNr = startDate.date();
			dateObject.date = startDate.format('DD/MM/YY');
			var events = myService.getEvent(dateObject.date);

			if(events){
				console.log(event);
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

	render(weekList, curMonth) {
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
		$(".calendarDate").hover(function () {
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
			var weekList = this.getWeekList(addMonth);
			this.render(weekList, addMonth);

		});

		// When user clicks left arrow he gets previous month and the dates updates
		$("#leftArrow").click(x => {
			var subMonth = currentMonth.subtract(1, 'month');
			var weekList = this.getWeekList(subMonth);
			this.render(weekList, subMonth);

		});

		$(".calendarDate").click(function () {
			window.location.href = "/#/events";
		})
	}

}

module.exports = calendar;


