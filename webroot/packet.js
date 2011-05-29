var time = new Date().getTime();
YUI().use('node', 'event', 'io-base', 'charts', function(Y) {
	var uri = "api";
	function complete(id, o, args) {
		var data = o.responseText;
		rtime = eval("(" + data + ")").milliseconds;
		var date = new Date(rtime);
		if(args.hasOwnProperty('t')){
			time = args.t;
		}
		difftime =(rtime-time)/1000; 
		console.log(new Date(time));
		Y.one("h2#difftime").set('innerHTML',difftime);
	}

	Y.on('io:complete', complete, Y, [time]);
	var request = Y.io(uri);

	Y.one("h2#difftime").on('click', function() { time = new Date().getTime(); request = Y.io(uri, {arguments:{t:time }}); });
	
});
