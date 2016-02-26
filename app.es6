//require('./day');
require('bootstrap-webpack');
var director = require('director');
var moment = require('moment');
var calendarTemplate = require('calendar.handlebars');
var eventsTemplate = require('dayEvents.handlebars');
var newEventTemplate = require('newEvent.handlebars');
console.log("goodbye");

var $mainContainer = $("#mainContainer");

var currentMonth = moment();

var routes = {
	'/' : function(){ $mainContainer.html(calendarTemplate)},
	'/new' : function() { $mainContainer.html(newEventTemplate)},
	'/events' : function() { $mainContainer.html(eventsTemplate)}
	};

var router = director.Router(routes);
router.init();

function getWeekList(date){
	var startDate = moment(date).startOf('month').startOf('week');
	var endDate = moment(date).startOf('month').startOf('week').add(6, 'weeks');

	var weekList = [];
	var dayList = [];

	var today = moment().startOf('day');

	while(!(startDate.isSame(endDate))){
		//console.log(startDate);
		var dateObject = {};
		dateObject.dateNr = startDate.date();
		dateObject.date = startDate.format('DD/MM/YY');
		if(startDate.isSame(today)){
			dateObject.today = true;
		}
		dayList.push(dateObject);
		if(dayList.length == 7){
			weekList.push(dayList);
			dayList = [];
		}
		startDate.add(1, 'days');
	};
	return weekList;
}

function render(weekList, curMonth){
	var calendarHeading = moment(curMonth).format('MMMM YYYY');
	$mainContainer.html(calendarTemplate({weekList: weekList, weekdays: [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthAndYear: calendarHeading
	}));
	addEventHandlers();
}

var weekList = getWeekList(currentMonth);

render(weekList, currentMonth);

function addEventHandlers(){

	// When user hovers over date it changes color
	// Today is marked with a different color and will return to that color when not hovered
	$(".calendarDate").hover(function(){
		$(this).css("background-color", "#d7d7d7");
	}, function(){
		if($(this).hasClass("thisIsToday")){
			$(this).css("background-color", "#e5e5ff");
		}else{
			$(this).css("background-color", "white");
		}
		});

	// When user clicks right arrow he gets next month and the dates updates
	$("#rightArrow").click(function(){
		var addMonth = currentMonth.add(1, 'month');
		var weekList = getWeekList(addMonth);
		render(weekList, addMonth);

	});

	// When user clicks left arrow he gets previous month and the dates updates
	$("#leftArrow").click(function(){
		var subMonth = currentMonth.subtract(1, 'month');
		var weekList = getWeekList(subMonth);
		render(weekList, subMonth);

	});

	$(".calendarDate").click(function(){
		window.location.href = "/#/events";
	})
}



