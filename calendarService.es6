'use strict';

class calendarService {
	constructor() {
		this.events = [];
	}

	// Event needs to have property date
	saveEvent(event){
		if(event){
			if(this.events[event.date]){
				this.events[event.date].concat(event);
			}else{
				this.events[event.date] = [event];
			}
		}
		else{
			console.error("Save event expects one parameter - event object");
		}
	}

	getEvent(date){
		return this.events[date];
	}

	getEvents(){
		return this.events;
	}
}

module.exports = calendarService;