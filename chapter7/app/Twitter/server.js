var express = require("express"),
	http = require("http"),
	tweetCounts = require("./tweet_counter.js"),
	app = express();

// настроим статическую файловую папку
// для маршрута по умолчанию
app.use(express.static(__dirname + "/client"));

// создадим HTTP-сервер на базе Express
http.createServer(app).listen(8080);

app.get("/counts.json", function(req, res) {
	res.json(tweetCounts);
});