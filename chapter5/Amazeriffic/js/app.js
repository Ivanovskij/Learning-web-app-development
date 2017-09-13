var main = function (toDoObjects) {
	"use strict";

	// как main имеет доступ к списку задач
};

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});