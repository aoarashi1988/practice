//protoType of the time : 
//"2018-02-06 20:45:12"
function getTimeTag( time ) {
	let today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	let buildTime = new Date( time );
	const second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24
	if ( today - buildTime <= 0 ) {
		return time.substr(11, 5);
	} else if ( today - buildTime < day ) {
		return '昨天' + time.substr(11, 5);
	} else {
		return time.substr(0, 16);
	}

}
