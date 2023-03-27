var startGame = document.getElementById("startGamebtn");
var artistOne = document.getElementById("artistOne");

var randomChoice = document.getElementById("randomChoice");
var startScreen = document.getElementById("start-screen");
var easyQuiz = document.getElementById("easyQuiz");
var responseCorrect = document.getElementById("responseCorrect");
var responseInorrect = document.getElementById("responseIncorrect");
var endScreen = document.getElementById("endScreen");

var dataItemA = document.getElementById("dataChoiceA");
var dataItemB = document.getElementById("dataChoiceB");
var dataItemC = document.getElementById("dataChoiceC");

var submitBtn = document.querySelector("#submitBtn");
var nameEl = document.querySelector("#Name");

var dataSet = [];
var checkAnswer = "";

// setting spotify rapid API info
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f53e094e6emsh648e1d2d2398731p1dd025jsne789b8d06fb9',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

// random items function
function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];
}

// when start game button is clicked
startGame.addEventListener("click", ()=>{
	getSongItems(); 
	startScreen.setAttribute("class","hide"); // hide main menu
	easyQuiz.removeAttribute("class","hide"); // shows main quiz
})

// setting api key and options for lyrics
const optionsGenius = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f53e094e6emsh648e1d2d2398731p1dd025jsne789b8d06fb9',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

// making track name global
var trackName;

// gets billboard top 100 playlist
var getSongItems = function () {
fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6UeSakyzhiEt4NB3UAd6NQ&offset=0&limit=15', options)
	.then(response => response.json())
	.then(response => {
		console.log(response.items) // logs all songs fetched

		response.items.forEach((songData,i) => {
			var rando =  Math.floor(Math.random()*response.items.length); // setting rando for larger scope
			if(i<3){ // gets 3 items
				// creates a data set with album and track name attributes
				dataSet.push(
				{
					'album':response.items[rando].track.album.images[0].url,
					'trackName':response.items[rando].track.name
				})
			}
		});

		// making 3 random, but constant variables
		var randoOne =  Math.floor(Math.random()*dataSet.length);
		console.log(randoOne)
		var randoTwo =  Math.floor(Math.random()*dataSet.length);
		console.log(randoTwo)
		var randoThree =  Math.floor(Math.random()*dataSet.length);
		console.log(randoThree)

		// Creates 3 other random images
		// console.log(dataSet); // for testing
		var dataItemA = dataSet[randoOne].album
		dataChoiceA.innerHTML = "<img src="+dataItemA+">" // grabs album image and puts it in html
		var dataItemTrackA = dataSet[randoOne].trackName
		dataChoiceA.setAttribute("value", dataItemTrackA) // sets image value as track name
		
		var dataItemB = dataSet[randoTwo].album
		dataChoiceB.innerHTML = "<img src="+dataItemB+">"
		var dataItemTrackB = dataSet[randoTwo].trackName
		dataChoiceB.setAttribute("value", dataItemTrackB)

		var dataItemC = dataSet[randoThree].album
		dataChoiceC.innerHTML = "<img src="+dataItemC+">"
		var dataItemTrackC = dataSet[randoThree].trackName
		dataChoiceC.setAttribute("value", dataItemTrackC)

		// gets random length for answer song
		var randomIndex = Math.floor(Math.random()*response.items.length);

		// grabs track name for genius
		trackName = response.items[randomIndex].track.name
		checkAnswer = trackName
		// console.log(trackName) // for testing

		// gets artists name for genius search
		var artistName = response.items[randomIndex].track.artists[0].name // grabs artist name for genius
		// console.log(artistName) // for testing

		// console.log(response.items[0].track.album.images[0].url) // logs the img url for the first song
		var albumImg = response.items[randomIndex].track.album.images[0].url
		artistOne.innerHTML = "<img src=" + albumImg + ">" // adds the img url to html formatting and displayed in page
		artistOne.setAttribute("value",trackName) // sets image value as track name

		// use to get the song ID from genius
		fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${trackName + artistName}&per_page=1&page=1`, optionsGenius)
			.then(response => response.json())
			.then(response => { 
				if(response.hits.length !== 0){
				console.log(response)
				getLyrics(response.hits[0].result.id)
				} else{
					getSongItems()
				}
			})
		.catch(err => console.error(err));

	})

	.catch(err => console.error(err));
}

// use to get the lyrics from genius
var getLyrics = function (id) {
fetch(`https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${id}&text_format=plain`, optionsGenius)
	.then(response => response.json())
	.then(response => {
		console.log(response)
	var plainLyric =	response.lyrics.lyrics.body.plain // converts lyrics into plain text
	const arrayLyric = plainLyric.split("[Chorus]") // splits at chorus
	// console.log(arrayLyric) // for testing
	var lyricContent; // making lyric content a larger scope
	// if lyrics are too short, split it into something usable
	if (arrayLyric.length > 1 ){ 
		lyricContent = arrayLyric[1].split("[")[0]
	} else {
		lyricContent = arrayLyric[0]
	}
 	// logs info after chorus in first array
	lyricText.innerHTML = lyricContent
	lyricText.setAttribute("value",trackName)
	})
	
	.catch(err => console.error(err));
}

// setting up score system
var score = 0;

// every question right = +1
function add1() {
	// console.log("Adding +1 to your score!"); // for testing
    score = score + 1; // adds +1
	// console.log(score) // for testing
}

// when button is clicked
artistOne.addEventListener("click", ()=>{
	// grabbing variables here so they can have assigned values after get songItems assigns them
	var valueArtistOne = document.getElementById("artistOne").value;
	var valueLyrics = document.getElementById("lyricText").value;

	// checking the values to be correct or incorrect
	if (valueArtistOne == valueLyrics) {
		// correct
		responseCorrect.removeAttribute("class","hide");
		setTimeout(function(){
			responseCorrect.setAttribute("class","hide");
		},3000)
		// add to score & get new lyrics/image
		add1();
		getSongItems();
		getLyrics();
	} else {
		// incorrect
		responseIncorrect.removeAttribute("class","hide")
		setTimeout(function(){
		responseIncorrect.setAttribute("class","hide");
		},3000)
		// ends quiz
		quizEnd()
	}
})

dataChoiceA.addEventListener("click", ()=>{
	// grabbing variables here so they can have assigned values after get songItems assigns them
	var valueDataItemA = document.getElementById("dataChoiceA").value; 
	var valueLyrics = document.getElementById("lyricText").value; 

	if (valueDataItemA == valueLyrics) {
		responseCorrect.removeAttribute("class","hide");
		setTimeout(function(){
			responseCorrect.setAttribute("class","hide");
		},3000)
		add1();
		getSongItems();
		getLyrics();
	} else {
		responseIncorrect.removeAttribute("class","hide")
		setTimeout(function(){
		responseIncorrect.setAttribute("class","hide");
		},3000)
		quizEnd()
	}
})

dataChoiceB.addEventListener("click", ()=>{
	// grabbing variables here so they can have assigned values after get songItems assigns them
	var valueDataItemB = document.getElementById("dataChoiceB").value;
	var valueLyrics = document.getElementById("lyricText").value; 

	if (valueDataItemB == valueLyrics) {
		responseCorrect.removeAttribute("class","hide");
		setTimeout(function(){
			responseCorrect.setAttribute("class","hide");
		},3000)
		add1();
		getSongItems();
		getLyrics();
	} else {
		responseIncorrect.removeAttribute("class","hide")
		setTimeout(function(){
		responseIncorrect.setAttribute("class","hide");
		},3000)
		quizEnd()
	}
})

dataChoiceC.addEventListener("click", ()=>{
	// grabbing variables here so they can have assigned values after get songItems assigns them
	var valueDataItemC = document.getElementById("dataChoiceC").value; 
	var valueLyrics = document.getElementById("lyricText").value; 

	if (valueDataItemC == valueLyrics) {
		responseCorrect.removeAttribute("class","hide");
		setTimeout(function(){
			responseCorrect.setAttribute("class","hide");
		},3000)
		add1();
		getSongItems();
		getLyrics();
	} else {
		responseIncorrect.removeAttribute("class","hide")
		setTimeout(function(){
		responseIncorrect.setAttribute("class","hide");
		},3000)
		quizEnd()
	}
})

// end screen load
function quizEnd() {
	easyQuiz.setAttribute("class","hide")
	endScreen.removeAttribute("class","hide")
}

// when submit button on end screen is clicked
submitBtn.addEventListener("click", () => {
	savehighscore()
}) 

// logs name and highscore to local storage
function savehighscore() {
	var name = nameEl.value; // variable for initials

	// gets highscore array and adds new data to highscore array if name is present
	if (name !== "") {
		var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
		var newScore = {
		score: score,
		name: name
		};

		// adds highscores to string and adds them to score.html from local storage
		highscores.push(newScore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));

		window.location.href = "highscores.html";
	}
}
