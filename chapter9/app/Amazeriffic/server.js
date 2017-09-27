var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	ToDo = require("./models/todo.js"),
	ToDosController = require("./controllers/todos_controller.js"),
	app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

// подключаемся к хранилищу данных
mongoose.connect('mongodb://localhost/amazeriffic');

http.createServer(app).listen(8080);

app.get("/todos.json", ToDosController.index);

app.post("/todos", ToDosController.create);