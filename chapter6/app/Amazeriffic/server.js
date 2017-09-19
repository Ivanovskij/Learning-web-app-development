var express = require("express"),
	http = require("http"),
	app = express(),
	toDos = {
		// настраиваем список задач копированием
		// содержимого из файла todos.json
	};

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(8080);

app.get("todos", function (req, res) {
	res.json(toDos);
});