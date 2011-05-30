var express = require('express');
var paperboy = require('paperboy');
var path = require('path');
var sys = require('sys');
var app = express.createServer();
var util = require('util');
var spawn = require('child_process').spawn;
var ceoip = require('./node_modules/geoip/ceoip');
var url = require('url');
var http = require('http');

WEB_ROOT = path.join(path.dirname(__filename), 'webroot');

app.get('/', function(req, res){
	paperboy.deliver(WEB_ROOT, req, res)	
	.before(function() {
    })
    .after(function() {
    })
    .error(function() {
      sys.puts('Error delivering: '+req.url);
    })
    .otherwise(function() {
      res.sendHeader(404, {'Content-Type': 'text/plain'});
      res.finish();
    });
});
app.get('/map', function(req, res) {
  var dbpath  = "/usr/local/share/GeoIP/GeoLiteCity.dat";
  var con = new ceoip.Connection();
  var latitude;
  var longitude;
  con.connect(dbpath);
  con.addListener('result', function(result) {
    console.log("latitude/longitude result");
    latitude = result.latitude;
    longitude = result.longitude;
  });
  ip = "69.17.64.132";//req.socket['remoteAddress'];
  con.query(ip);
  yAppID = '5h3tEI72';
  options = {
    host: 'local.yahooapis.com',
    path: '/MapsService/V1/mapImage?appid=' + yAppID + '&latitude=' + latitude + "&longitude=" + longitude + "&image_width=900&image_height=700&radius=5&output=json"
  }
  var mapRequest = http.request(options, function(mapResponse) {
    var mapResponseData;
    mapResponse.on('data', function(chunk) {
      console.log('started request');
      mapResponseData += chunk;	
    });
    mapResponse.on('end', function() {
      console.log('ended request');
      mapImageURL = JSON.parse(mapResponseData)['ResultSet']['Result'];
	  res.send(ip + ":" + latitude + ":" + longitude + ":" + mapImageURL);
    });
  });
  mapRequest.end();
});
app.get('/js/*', function(req, res) {
	res.download("webroot/packet.js");
});
app.get('/api', function(req, res){
    var time;
    var milliseconds = new Date().getTime();
    res.send("{'milliseconds':"+milliseconds+"}");
});

app.listen(8000);

function getMap(latitude, longitude) {
  yAppID = '5h3tEI72';
  options = {
    host: 'local.yahooapis.com',
    path: '/MapsService/V1/mapImage?appid=' + yAppID + '&latitude=' + latitude + "&longitude=" + longitude + "&image_width=900&image_height=700&radius=5&output=json"
  }
  var mapRequest = http.request(options, function(mapResponse) {
    var mapResponseData;
    mapResponse.on('data', function(chunk) {
      console.log('started request');
      mapResponseData += chunk;	
    });
    mapResponse.on('end', function() {
      console.log('ended request');
      mapImageURL = JSON.parse(mapResponseData)['ResultSet']['Result'];
	  return mapImageURL;
    });
  });
}
