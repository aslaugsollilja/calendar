//require('./day');
require('bootstrap-webpack');
var moment = require('moment');
var calendarTemplate = require('calendar.handlebars');
//var eventsTemplate = require('dayEvents.handlebars');
//var newEventTemplate = require('newEvent.handlebars');
console.log("goodbye");

var currentMonth = moment();

function getWeekList(date){
	var startDate = moment(date).startOf('month').startOf('week');
	var endDate = moment(date).startOf('month').startOf('week').add(6, 'weeks');

	console.log("This is start date: ", startDate.toDate());
	console.log("This is end date: ", endDate.toDate());

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
	$("#calendarContainer").html(calendarTemplate({weekList: weekList, weekdays: [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthAndYear: calendarHeading
	}));
	addEventHandlers();
}

var weekList = getWeekList(currentMonth);

render(weekList, currentMonth);

function addEventHandlers(){

	$(".calendarDate").hover(function(){
		$(this).css("background-color", "grey");
	}, function(){
			$(this).css("background-color", "white");
		}
	);


	$("#rightArrow").click(function(){
		var addMonth = currentMonth.add(1, 'month');
		var weekList = getWeekList(addMonth);
		render(weekList, addMonth);

	});

	$("#leftArrow").click(function(){
		var subMonth = currentMonth.subtract(1, 'month');
		var weekList = getWeekList(subMonth);
		render(weekList, subMonth);

	});
}



