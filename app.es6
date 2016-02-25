//require('./day');
require('bootstrap-webpack');
var moment = require('moment');
var calendarTemplate = require('calendar.handlebars');
console.log("goodbye");


var startDate = moment().startOf('month').startOf('week').subtract(1, 'days');
var endDate = moment().startOf('month').startOf('week').add(6, 'weeks');


console.log(startDate.toDate());
console.log(endDate.toDate());
//console.log(firstDay);
//console.log(lastDay);

var weekList = [];
var dayList = [];

while(!(startDate.isSame(endDate))){
	//console.log(startDate);
	var dateObject = {};
	dateObject.dateNr = startDate.date();
	dateObject.date = startDate.format('DD/MM/YY');
	dayList.push(dateObject);
	if(dayList.length == 6){
		weekList.push(dayList);
	}
	startDate.add(1, 'days');
};
console.log(weekList);

$("#calendarContainer").html(calendarTemplate({dayList: dayList}));
