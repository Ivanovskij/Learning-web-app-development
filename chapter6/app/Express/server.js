var express = require("express"),
http = require("http"),
app;
// Создаем http-сервер на основе Express
// и заставляем его слушать на порте 3000
app = express();
http.createServer(app).listen(3000);
// настраиваем маршруты
app.get("/hello", function (req, res) {
res.send("Hello, World!");
});
app.get("/goodbye", function (req, res) {
res.send("Goodbye, World!");
});