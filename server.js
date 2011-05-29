var http = require("http");
var value = 1;

http.createServer(function(req,res) {
	var index;
	for(index=0; index<3;++index){
		doSomething(function() {
			console.log('index = ' + index);
		});
	}
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write("{'there is ':'an API ?'}");
	res.end();
}).listen(8000, "127.0.0.1"); 
console.log("winning");

function doSomething(callback) {
	callback();	
}

