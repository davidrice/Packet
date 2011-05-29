var d = new Date();
console.log(d);
/*

var util = require('util');
var spawn = require('child_process').spawn;
date = spawn('date', ['+%s']);
date.stdout.on('data', function (data) {
	console.log(data.toString());
	data = data;

});

date.stderr.on('data', function(error) {

	console.log("error" + error);

});

date.on('exit', function(exit) {
	console.log("ended with " + exit);
});

*/
