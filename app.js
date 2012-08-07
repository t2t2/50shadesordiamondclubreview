// Static server
var files = new (require('node-static').Server)('./public');
var httpServer = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        // Serve files!
        files.serve(request, response);
    });
});
httpServer.listen(process.env.VMC_APP_PORT || 1337, null);

/* socket.io */
var io = require('socket.io').listen(httpServer);

var accessCodes = {
	"brianisamagician": {
		"host": "Brian",
		"room": ["host"],
		"access": {
			"admin": false
		}
	},
	"justinisaseajew": {
		"host": "Justin",
		"room": ["host"],
		"access": {
			"admin": false
		}
	},
	"twitsTDdesk": {
		"room": ["host"],
		"access": {
			"admin": false
		}
	},
	"t2t2hasasecrettoken": {
		"room": ["host", "admin"],
		"access": {
			"admin": true
		}
	},
	"guest": {
		"room": [],
		"access": {
			"admin": false
		}
	}
}

var reviews = [
	{
		title: "",
		content: "<p>About half way through the book, I looked up the author to see if she was a teenager. I really did because the characters are out of a 16 year old's fantasy. It seriously feels like 2 teenage girls got together and decided to create their \"dream man\".</p><p>Then come the sex scenes. The first one is tolerable but as she goes on, they become so unbelievable that it becomes more laughable than erotic. It seems that she's climaxing on every page.</p><p>The writing is just not up to par, the characters are unbelievable, and the sex verges on the comical.</p>",
		stars: 2,
		book: 2
	},
	{
		title: "",
		content: "<p>I hardly ever find books written with female leads who seem authentic and to whom I can really relate. But to see so much in this book’s protagonist, and her romance saga that it has been very moving for me. This was just the think to fill that grey shaped hole in my heart.</p>",
		stars: 2,
		book: 1
	},
	{
		title: "",
		content: "<p>This book was really rather stupid.</p><p>I had heard all the hype, and I just had to get it. Boy was I let down.</p><p>It reminded me of a cheesy porn movie. The characters are so one noted. [The main character] is awkward, and the only thing she does more than blushing is biting her lip. Overall, it's just lame.</p>",
		stars: 2,
		book: 2
	},
	{
		title: "",
		content: "<p>What is all the hype. Started to read this supposed pornographic romance. Boring characters, predictable story and kept wondering when the story would become more than a ho hum. Stopped counting the number of times the author used the word 'gorgeous' after the 5-6 time and then stopped reading.</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>Throughout my whole life, I’ve hated reading! However, [Book Name Here], seems to be a miracle!! I instantly fell in love with...</p>",
		stars: 5,
		book: 2
	},
	{
		title: "",
		content: "<p>As someone new the (sp)  the ‘Romance Book’ genre, I have to say I am blown away by this book! I bought this book based on the ratings and Top Selling position no knowing what to expect. Needless to say after downloading this on the subway I was unable to... exit at my stop. In fact the book is so good that I’ve missed my stop twice more and had to stop reading as I was already two hours late.</p>",
		stars: 5,
		book: 1
	},
	{
		title: "",
		content: "<p>She gets eaten out by a bearded lady from a circus act eww. Turn off... No connection to the characters. I couldn’t even finish this book. It was pure nonsense. Don’t bother read... anything but this please.</p>",
		stars: 1,
		book: 1
	},
	{
		title: "",
		content: "<p>I cannot believe this book is a top seller. It is poorly written, unoriginal, unengaging and well, utter crap comes to mind. How did this get to be a 4.5 star best seller? Seriously</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>Book ends in the middle of a sentence I have no idea how it ends!</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>Every copy should include a bottle of lotion and some Kleenex. Don’t waste your time or money. You can get this stuff on the internet for free</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>What a waste. Didn't even finish it.. Was very disappointed after reading all the good reviews.</p><p>No plot what-so-ever. Unrealistic as well. Having sex on the table at iHop.....really?</p>",
		stars: 1,
		book: 1
	},
	{
		title: "",
		content: "<p>Hype, Hype, Hype! This book should barely be called a romance novel. After a few chapters I was bored to death. This book is for those who have not experienced sexual adventure in their lives. I have decided to call it quits after (chapter),  as I cannot bear to read one more sexual encounter.</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>The book had many great reviews, but reading the sample made me hesitate. I decided to go ahead and read it anyway, and found myself surprisingly immersed into the story. The feelings of passion and emotion between the characters were so well conveyed. The growth that (main character) goes through as the story progresses, and the discoveries she makes about herself give us all something we can relate to, while having a bit of fun reading it. All in all, I would say that it was a fantastic read, and it only gets 4 stars because I found that when I was done, I wanted just a BIT more. Another couple chapters in the resolution, and I would have given it 5 stars. I can’t wait for the next one!</p>",
		stars: 4,
		book: 1
	},
	{
		title: "",
		content: "<p>This book is just ok to me. I don't like the fact that it seems to be written by a bitter ex girlfriend that couldn't get over her most recent love. I also don't like the unrealistic lust scenes, but other than that it was ok.</p>",
		stars: 3,
		book: 1
	},
	{
		title: "",
		content: "<p>My GF heard about this book at work and made me buy it for our iPad. She says I will be rewarded handsomely for this. I wonder what she means... ;)</p>",
		stars: 5,
		book: 1
	},
	{
		title: "",
		content: "<p>Are you kidding me..you leave me hanging like this after such a story..HOW DARE YOU..I WISH I NEVER READ ONE PAGE..Will not read another by this author (if you can call [her] an author.)</p>",
		stars: 5,
		book: 2
	},
	{
		title: "",
		content: "<p>I have never written a book review before but I felt compelled to leave one for this book. It was absolute crap - A complete waste of money. I can’t believe I paid for this poorly written, uncaptivating, trashy “novel.” Makes me wonder what kind of people are rating this book so highly? Please don’t waste your time if you’ve ever completed any sort of higher education. You will be sorely disappointed.</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>I usually don't like to be critical, and so much has been said about these books already, but as someone who isn't really \"in\" to this kind of genre, I was curious and started the book with an open mind.</p><p>I was very turned off by the writing style. It seemed a bit amateurish, if that makes any sense when describing a book that's sold so well.</p><p>People who like easy, cheap thrills will love this book, but if you're looking for a very involved story with \"deep\" writing, look elsewhere.</p><p>[This book] is like neither; it's more like someone just learned English and decided to write a sex book.</p><p>I will say some of the explicit scenes were *WOW* in their graphic detail, but what even more shocking is the utter cheesiness of this book.</p>",
		stars: 2,
		book: 2
	},
	{
		title: "",
		content: "<p>I just started reading this book and feel very underwhelmed by the story plot.  It started out strong and really lost me at the explicit sex.  No, I’m not a prude.  The writing is so poor and I noticed inconsistencies.  Still don’t understand the big to-do about this book.  I feel suckered...  Hopefully if I keep reading , it will change, but I doubt it. I’m wondering if I can get a refund.</p>",
		stars: 1,
		book: 2
	},
	{
		title: "",
		content: "<p>I’ve never read something like this. This has a little of everything; romance and sex.</p>",
		stars: 3,
		book: 1
	},
	{
		title: "",
		content: "<p>My marriage of 21 years has gotten a little bit simple.  I did not first read this book in order to get inspired but it was a side effect of reading this passionate read.</p>",
		stars: 5,
		book: 1
	},
	{
		title: "",
		content: "<p>The story has a decent plot at the root of it.  Unfortunately, the writing is extremely sophomoric.  Typos and slang belong in blogs, not literature.  I am glad I only downloaded the sample.</p>",
		stars: 2,
		book: 1
	},
	{
		title: "",
		content: "<p>I am almost embarrassed to admit that I actually read this book from start to finish. I find it hard to believe that it has sold as many copies as it has, however, I fell into the trap too. I had just finished reading a wonderful historical fiction (Kitchen House) when I picked this book up. Oh what a difference in writers, one exceptional, one who I honestly felt was awful! If you are an avid reader, you will be very disappointed. If you don't read much and like trash, you will probably like it.</p>",
		stars: 2,
		book: 2
	},
	{
		title: "",
		content: "<p>Either I'm really perverted or this wasn't as erotic as everyone is making it out to be. Sex scenes are graphic, yes, but not any more so than the average romance novel. </p>",
		stars: 3,
		book: 2
	},
	{
		title: "This is an reminder to t2t2 that this is the last review. He will probably miss it. Pretend this isn't here",
		content: "<p>So satisfying.</p>",
		stars: 5,
		book: 1
	},
	{
		title: "t2t2 was an idiot and didn't read that the last one was last. Boo him!",
		content: "<p></p>",
		stars: 1,
		book: 1
	}
]

var quiz = {
	status: false,
	scored: true,
	current: -1,
	ready: {
		"Brian": false,
		"Justin": false
	},
	scores: {
		"Brian": 0,
		"Justin": 0
	},
	answer: {
		"Brian": 0,
		"Justin": 0
	},
	polls: {

	}
}

io.sockets.on('connection', function (socket) {
	socket.accessToken = false;
	socket.on("auth", function(key, fn) {
		if(accessCodes[key]) {
			socket.accessToken = key;
			fn(true);
			if(!quiz.status && accessCodes[socket.accessToken].host) {
				quiz.ready[accessCodes[socket.accessToken].host] = true
				socket.broadcast.emit("player-ready", accessCodes[socket.accessToken].host)
			}
			if(accessCodes[socket.accessToken].access.admin) {
				socket.emit("allow-admin")
			}
			if(!accessCodes[socket.accessToken].host) {
				socket.emit("poll-mode")
			}
			socket.sendData(true);
		} else {
			fn(false);
		}
	})
	socket.sendData = function(newuser) {
		if(newuser) {
			if(quiz.status) {
				socket.emit("playtime")
			} else {
				socket.emit("waitngroom")
			}
		}
		if(quiz.status) {
			socket.emit("review", {
				"title": reviews[quiz.current].title,
				"content": reviews[quiz.current].content,
				"stars": reviews[quiz.current].stars
			})
		}
		socket.emit("scores", quiz.scores)
		if(quiz.ready.Brian) {
			socket.emit("player-ready", "Brian")
		}
		if(quiz.ready.Justin) {
			socket.emit("player-ready", "Justin")
		}
	}
	socket.on("admin-reveal", function() {
		if(!accessCodes[socket.accessToken].access.admin || quiz.scored) {
			return;
		}
		quiz.scored = true;
		io.sockets.emit("answer-overlay-1")
		setTimeout(function() {
			var answers = {"Brian": "", "Justin": ""}
			if(quiz.answer.Brian == 1) {
				answers.Brian = "The Diamond Club"
			} else if(quiz.answer.Brian == 2) {
				answers.Brian = "50 Shades of Grey"
			}
			if(quiz.answer.Justin == 1) {
				answers.Justin = "The Diamond Club"
			} else if(quiz.answer.Justin == 2) {
				answers.Justin = "50 Shades of Grey"
			}

			io.sockets.emit("answer-overlay-2", answers);
			setTimeout(function() {
				var answercount = [0, 0]
				for (var key in quiz.polls) {
					if(quiz.polls[key] == 1) {
						answercount[0] += 1
					}
					if(quiz.polls[key] == 2) {
						answercount[1] += 1
					}
				}
				io.sockets.emit("answer-overlay-3", {
					"book1": answercount[0],
					"book2": answercount[1]
				});
				setTimeout(function() {
					io.sockets.emit("answer-overlay-4")
					setTimeout(function() {
						if(reviews[quiz.current].book == 1) {
							io.sockets.emit("answer-overlay-5", "The Diamond Club")
							if(quiz.answer.Brian == 1) {
								quiz.scores.Brian += 1
							}
							if(quiz.answer.Justin == 1) {
								quiz.scores.Justin += 1
							}
						}
						if(reviews[quiz.current].book == 2) {
							io.sockets.emit("answer-overlay-5", "50 Shades of Grey")
							if(quiz.answer.Brian == 2) {
								quiz.scores.Brian += 1
							}
							if(quiz.answer.Justin == 2) {
								quiz.scores.Justin += 1
							}
						}
						io.sockets.emit("scores", quiz.scores)
						setTimeout(function() {
							io.sockets.emit("answer-overlay-6")
						}, 5000);
					}, 1000);
				}, 5000);
			}, 3000);
		}, 1000)
	});
	socket.on("admin-next", function() {
		if(!accessCodes[socket.accessToken].access.admin || !quiz.scored) {
			return;
		}
		if(!quiz.status) {
			io.sockets.emit("playtime")
			quiz.status = true;
		}
		quiz.current += 1
		quiz.answer.Brian = 0
		quiz.answer.Justin = 0
		quiz.ready.Brian = false
		quiz.ready.Justin = false
		quiz.scored = false;
		quiz.polls = {}
		io.sockets.emit("newround")
		io.sockets.emit("review", {
			"title": reviews[quiz.current].title,
			"content": reviews[quiz.current].content,
			"stars": reviews[quiz.current].stars
		});
	});
	socket.on("answer", function(answer) {
		if(answer != 1 && answer != 2) {
			return false;
		}
		if(accessCodes[socket.accessToken].host && !quiz.ready[accessCodes[socket.accessToken].host]) {
			quiz.answer[accessCodes[socket.accessToken].host] = answer
		}
		quiz.polls[socket.id] = answer // Includes hosts
	});
	socket.on("lockin", function(fn) {
		if(accessCodes[socket.accessToken].host && quiz.answer[accessCodes[socket.accessToken].host] > 0) {
			quiz.ready[accessCodes[socket.accessToken].host] = true
			io.sockets.emit("player-ready", accessCodes[socket.accessToken].host)
			fn(true)
		}
	})
});