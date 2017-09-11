var main = function() {
	'use strict';
	var addCommentFromInputBox = function() {
		var $text_comment = $(".comment-input input").val();
		if ($text_comment == "") {
			return;
		}
		var $new_comment = $("<p>");
		$new_comment.hide();
		$new_comment.text($text_comment);
		$(".comments").append($new_comment);
		$new_comment.fadeIn();
		$(".comment-input input").val("");
	};

	$(".comment-input button").on("click", function(event) {
		addCommentFromInputBox();
	});

	$(".comment-input input").on("keypress", function(event) {
		if (event.keyCode == 13) {
			addCommentFromInputBox();
		}
	});
};


$(document).ready(main);