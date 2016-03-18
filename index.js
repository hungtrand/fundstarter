var http = require('http');
var fs = require('fs');


/******************************* PART 1A ***********************************/

// part 1b
var readSyncHTML = function() {
    return fs.readFileSync("./index.html", "utf8");
}

// part 1b
var listener_a = function(req, res) {
    res.end(readSyncHTML());
}

var server_a = http.createServer(listener_a);
server_a.listen('8080');
/************************** END of PART 1A ********************************/



/*************************** PART 1B *************************************/
var readHTML = function(callback) {
    fs.readFile("./index.html", "utf8", function(err, content) {
	if (err) return callback(err);
	
	callback(null, content);
    });
}

var listener_b = function(req, res) {
    readHTML(function(err, content) {
	res.writeHead(200);
	
	res.end(content);
    });
}

var server_b = http.createServer(listener_b);
server_b.listen('8081');
/**************************** END of PART 1B *******************************/


