/* Author: t2t2

*/

var socket = io.connect();
socket.on('connect', function () {
	$("#connecting").remove();
	$('#login').modal({backdrop: "static", keyboard: false});
});
socket.on("waitngroom", function() {
	$("#waitingroom").show()
})
socket.on('scores', function(scores) {
	$("#score-Brian").text(scores.Brian)
	$('#score-Justin').text(scores.Justin)
});
socket.on("allow-admin", function() {
	$("#admin").show();
});
socket.on("poll-mode", function() {
	$("#lockin").hide();
});
socket.on("player-ready", function(player) {
	$("#player-"+player).addClass("ready")
});
socket.on("playtime", function() {
	$("#waitingroom").hide();
	$("#review").show();
});
socket.on("newround", function() {
	$(".name.ready").removeClass("ready")
	$("#answer-1, #answer-2, #lockin").removeAttr("disabled", "disabled").removeClass("active")
	$("#answer-Brian, #answer-Justin, #answer-chatrealm1, #answer-chatrealm2, #answer-forreal").text("")
	$("#answers-1, #answers-2, #answers-3").hide()
});
socket.on("review", function(review) {
	$("#review-title").text(review.title)
	$("#review-stars").text(review.stars+" stars")
	$("#review-content").html(review.content)
});
$('#watch').click(function() {
	socket.emit("auth", "guest", function(success) { 
		if(success) {
			$('#login').modal('hide').remove();
		}
	});
	return false;
});
$("#login-btn").click(function() {
	socket.emit("auth", $("#accesscode").val(), function(success) {
		if(success) {
			$('#login').modal('hide').remove();
		} else {
			$("#login-error").fadeIn().delay(1000).fadeOut()
		}
	});
	return false;
});
$("#answer-1").click(function() {
	socket.emit("answer", 1)
});
$("#answer-2").click(function() {
	socket.emit("answer", 2)
});
$("#lockin").click(function() {
	socket.emit("lockin", function(returned) {
		if(returned) {
			$("#answer-1, #answer-2, #lockin").attr("disabled", "disabled")
		}
	})
});
$("#admin-reveal").click(function() {
	socket.emit("admin-reveal")
});
$("#admin-next").click(function() {
	socket.emit("admin-next")
});
$('#answers').modal({
	backdrop: "static",
	keyboard: false,
	show: false
});
socket.on("answer-overlay-1", function() {
	$("#answers").modal("show")
});
socket.on("answer-overlay-2", function(answers) {
	$("#answers-1").fadeIn()
	$("#answer-Brian").text(answers.Brian)
	$("#answer-Justin").text(answers.Justin)
});
socket.on("answer-overlay-3", function(answers) {
	$("#answers-2").fadeIn()
	$("#answer-chatrealm1").text(answers.book1)
	$("#answer-chatrealm2").text(answers.book2)
});
socket.on("answer-overlay-4", function() {
	$("#answers-3").fadeIn();
});
socket.on("answer-overlay-5", function(answer) {
	$("#answer-forreal").text(answer)
});
socket.on("answer-overlay-6", function() {
	$("#answers").modal("hide")
});