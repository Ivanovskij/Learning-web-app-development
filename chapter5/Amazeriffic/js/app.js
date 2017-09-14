var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

	$(".tabs a span").toArray().forEach(function (_element) {
		$(_element).on("click", function() {
			var $content,
				$input,
				$button,
				i;

			var $element = $(_element);
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (i = toDos.length - 1; i >= 0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}

			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.append($("<li>").text(todo));
				});

			} else if ($element.parent().is(":nth-child(3)")) {
				var tags = [];

				toDoObjects.forEach(function (toDo) {
					toDo.tags.forEach(function (tag) {
						if (tags.indexOf(tag) === -1) {
							tags.push(tag);
						}
					});
				});

				var tagObjects = tags.map(function (tag) {
					var toDosWithTag = [];

					toDoObjects.forEach(function (toDo) {
						if (toDo.tags.indexOf(tag) !== -1) {
							toDosWithTag.push(toDo.description);
						}
					});

					return { "name": tag, "toDos": toDosWithTag };
				});

				tagObjects.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
						$content = $("<ul>");


					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});

			} else if ($element.parent().is(":nth-child(4)")) {
				$input = $("<input type='text'>");
				$button = $("<button>").text("+");
				$("main .content").append($input).append($button);

				$button.on("click", function() {
					var $text_input = $("input").val();
					if ($text_input == "" ||
						$text_input == null) {
						return;
					}
					toDos.push($text_input);
					$("input").val("");
				});
			}

			$("main .content").append($content);

			return false;
		});
	});

	// фальшивый щелчек
	// Это динамически сконструирует содержимое
	$(".tabs a:first-child span").trigger("click");
};


var organizeByTags = function(toDoObjects) {
	// получаем все теги
	// без дупликатов
	var tags = [];
	toDoObjects.forEach(function (todo) {
		todo.tags.forEach(function (tag) {
			// убеждаемся, что такого тега еще нет
			// избегаем дупликтов
			if (tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		});
	});

var tagObjects = tags.map(function (tag) {
	// здесь мы находим все задачи,
	// содержащие этот тег
	var toDosWithTag = [];

	toDoObjects.forEach(function (toDo) {
		// проверка, что результат
		// indexOf is *не* равен -1
		if (toDo.tags.indexOf(tag) !== -1) {
			toDosWithTag.push(toDo.description);
		}
	});

	// мы связываем каждый тег с объектом, который
	// содержит название тега и массив
	return { "name": tag, "toDos": toDosWithTag };
	});
};

$(document).ready(function() {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});