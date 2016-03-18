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

/*************************** PART 2 - fs.open() ****************************/
var openHTML = function(callback) {
    var file = "./index.html";
    fs.exists(file, function(exists) {
	if (!exists) return callback("File not found:" + file);

	fs.stat(file, function(statErr, stats) {
	    if (statErr) return  callback(statErr);

	    fs.open("./index.html", "r", function(openErr, fd) {
		if (openErr) return callback(openErr);
		
		var buff = new Buffer(stats.size);

		fs.read(fd, buff, 0, buff.length, null, function(readErr, bytesRead, readBuff) {
		    var content = readBuff.toString("utf8", 0, readBuff.length);
		    callback(readErr, content);
		    fs.close(fd);
		});
	    });
	});
    });
}

var listener_2_open = function(req, res) {
    openHTML(function(err, content) {
	res.writeHead(200);
	res.end(content);
    });
}

var server_2_open = http.createServer(listener_2_open);
server_2_open.listen("8082");
/*************************** PART 2 - end fs.open() ***********************/

