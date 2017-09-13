var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function (toDo) {
		alert(toDo.description);
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
				alert("h");
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

$(document).ready(function() {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});