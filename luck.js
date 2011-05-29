var express = require('express');
var paperboy = require('paperboy');
var path = require('path');
var sys = require('sys');
var app = express.createServer();
var util = require('util');
var spawn = require('child_process').spawn;
WEB_ROOT = path.join(path.dirname(__filename), 'webroot');
app.get('/', function(req, res){
	paperboy.deliver(WEB_ROOT, req, res)	
	.before(function() {
      //sys.puts('About to deliver: '+req.url);
    })
    .after(function() {
      //sys.puts('Delivered: '+req.url);
    })
    .error(function() {
      sys.puts('Error delivering: '+req.url);
    })
    .otherwise(function() {
      res.sendHeader(404, {'Content-Type': 'text/plain'});
      res.sendBody('Sorry, no paper this morning!');
      res.finish();
    });
});
app.get('/js/*', function(req, res) {
	res.download("webroot/packet.js");
});
app.get('/api', function(req, res){

    var time;
    var milliseconds = new Date().getTime();
    res.send("{'milliseconds':"+milliseconds+"}");
	console.log(req.headers['x-forwarded-for']);
	/*
	
	date = spawn('date', ['+%s']);
	date.stdout.on('data', function (data) {
		time = data.toString();
	});

	date.stderr.on('data', function(error) {
		console.log("error" + error);
	});

	date.on('exit', function(exit) {
		//res.sendHeader(201, {'Content-Type': 'application/json'});
		//res.send(JSON.stringify({date:time}));
		res.send("{'time':"+time+",'milliseconds':"+milliseconds+"}");
		console.log("Hello API ended with " + exit);
	});
	*/
});
	
app.listen(8000);
