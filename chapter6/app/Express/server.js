var express = require("express"),
	http = require("http"),
	app = express();

// настроим статическую файловую папку
// для маршрута по умолчанию
app.use(express.static(__dirname + "/client"));

// создадим HTTP-сервер на базе Express
http.createServer(app).listen(8080);

// настроим маршруты
app.get("/hello", function (req, res) {
	res.send("hello world!");
});
app.get("/goodbye", function (req, res) {
	res.send("goodbye world!");
});
