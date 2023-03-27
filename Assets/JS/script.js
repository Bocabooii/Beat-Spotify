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

// allows for multiple actions to happen on one click
startGame.addEventListener("click", ()=>{
	getSongItems();
	startScreen.setAttribute("class","hide");
	easyQuiz.removeAttribute("class","hide");
})

// setting api key and options for lyrics
const optionsGenius = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f53e094e6emsh648e1d2d2398731p1dd025jsne789b8d06fb9',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

var trackName;

// gets billboard top 100 playlist
var getSongItems = function () {
fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6UeSakyzhiEt4NB3UAd6NQ&offset=0&limit=20', options)
	.then(response => response.json())
	.then(response => {
		console.log(response.items) // logs all songs fetched

		response.items.forEach((songData,i) => {
			var rando =  Math.floor(Math.random()*response.items.length);
			if(i<3){
				dataSet.push(
				{
					'album':response.items[rando].track.album.images[0].url,
					'trackName':response.items[rando].track.name
				})
			}
		});

		var randoOne =  Math.floor(Math.random()*dataSet.length);
		console.log(randoOne)
		var randoTwo =  Math.floor(Math.random()*dataSet.length);
		console.log(randoTwo)
		var randoThree =  Math.floor(Math.random()*dataSet.length);
		console.log(randoThree)

		// Creates 3 other random images
		console.log(dataSet);
		var dataItemA = dataSet[randoOne].album
		dataChoiceA.innerHTML = "<img src="+dataItemA+">"
		var dataItemTrackA = dataSet[randoOne].trackName
		dataChoiceA.setAttribute("value", dataItemTrackA)
		
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
		console.log(trackName)

		// gets artists name for genius search
		var artistName = response.items[randomIndex].track.artists[0].name
		console.log(artistName)

		// console.log(response.items[0].track.album.images[0].url) // logs the img url for the first song
		var albumImg = response.items[randomIndex].track.album.images[0].url
		artistOne.innerHTML = "<img src=" + albumImg + ">" // adds the img url to html formatting and displayed in page
		artistOne.setAttribute("value",trackName)

		// use to get the song ID from genius
		fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${trackName + artistName}&per_page=1&page=1`, optionsGenius)
			.then(response => response.json())
			.then(response => { 
				if(response.hits.length !== 0){
					
				console.log(response)
				// console.log(response.hits[0].result.id)
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
	console.log(arrayLyric)
	var lyricContent;
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

var score = 0;

function add1() {
	console.log("Adding +1 to your score!");
    score = score + 1;
	console.log(score)
}

artistOne.addEventListener("click", ()=>{
	var valueArtistOne = document.getElementById("artistOne").value; // success
	var valueLyrics = document.getElementById("lyricText").value; // undefined

	if (valueArtistOne == valueLyrics) {
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

dataChoiceA.addEventListener("click", ()=>{
	var valueDataItemA = document.getElementById("dataChoiceA").value; // success
	var valueLyrics = document.getElementById("lyricText").value; // undefined

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
	var valueDataItemB = document.getElementById("dataChoiceB").value; // success
	var valueLyrics = document.getElementById("lyricText").value; // undefined

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
	var valueDataItemC = document.getElementById("dataChoiceC").value; // success
	var valueLyrics = document.getElementById("lyricText").value; // undefined

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

submitBtn.addEventListener("click", () => {
	savehighscore()
}) 

function savehighscore() {
	var name = nameEl.value; // variable for initials

	// gets highscore array and adds new data to highscore array if initals are present
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
