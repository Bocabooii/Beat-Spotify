var startGame = document.getElementById("startGamebtn");
var artistOne = document.getElementById("artistOne");
var valueArtistOne = document.getElementById("artistOne").value;

var randomChoice = document.getElementById("randomChoice");
var startScreen = document.getElementById("start-screen");
var easyQuiz = document.getElementById("easyQuiz");
var responseCorrect = document.getElementById("responseCorrect");
var responseInorrect = document.getElementById("responseIncorrect");
var endScreen = document.getElementById("endScreen");

var valueLyrics = document.getElementById("lyricText").value;

var dataItemA = document.getElementById("dataChoiceA");
var valueDataItemA = document.getElementById("dataChoiceA").value;
var dataItemB = document.getElementById("dataChoiceB");
var dataItemC = document.getElementById("dataChoiceC");

var dataSet = [];
var checkAnswer = "";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3260a7835dmshba7fcc1d2d00919p132149jsnd4e6fcd6663e',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

// "popular" search 
// var getPopularMusic = function() {
// fetch('https://spotify23.p.rapidapi.com/search/?q=popular&type=tracks&offset=0&limit=10&numberOfTopResults=5', options)
//     .then(response => response.json())
//     .then(response => {
// 		console.log(response.tracks.items)
// 		var randomTrack = random_item(response.tracks.items);
// 		var trackId = randomTrack.data.id;
// 		console.log(trackId);
// 		console.log(randomTrack);
// 		getMusicById(trackId);
// 	})
//     .catch(err => console.error(err));
// }

// Unsure if we need/purpose?
// var getMusicById = function(id) {
// 	fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${id}`, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// }

// random items function
function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];
}

// allows for multiple actions to happen on one click
startGame.addEventListener("click", ()=>{
	// console.log("start button works")
	// getPopularMusic();
	getSongItems();
	startScreen.setAttribute("class","hide");
	easyQuiz.removeAttribute("class","hide");
})

// setting api key and options for lyrics
const optionsGenius = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d1ed2a192msh98939cb7c479eaap1118bajsn8c8e3a534674',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

var trackName;

// gets billboard top 100 playlist
var getSongItems = function () {
fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6UeSakyzhiEt4NB3UAd6NQ&offset=0&limit=15', options)
	.then(response => response.json())
	.then(response => {
		console.log(response.items) // logs all songs fetched

		response.items.forEach((songData,i) => {
			if(i<3){
				var rando =  Math.floor(Math.random()*response.items.length);
				dataSet.push(
				{
					'album':response.items[rando].track.album.images[0].url,
					'trackName':response.items[rando].track.name
				})
				
			}
		});

		// Creates 3 other random images
		console.log(dataSet);
		var dataItemA = dataSet[0].album
		dataChoiceA.innerHTML = "<img src="+dataItemA+">"
		var dataItemTrackA = dataSet[0].trackName
		dataChoiceA.setAttribute("value", dataItemTrackA)
		
		var dataItemB = dataSet[1].album
		dataChoiceB.innerHTML = "<img src="+dataItemB+">"
		var dataItemTrackB = dataSet[1].trackName
		dataChoiceB.setAttribute("value", dataItemTrackB)

		var dataItemC = dataSet[2].album
		dataChoiceC.innerHTML = "<img src="+dataItemC+">"
		var dataItemTrackC = dataSet[2].trackName
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

// correct answer
artistOne.addEventListener("click", ()=>{
	if (valueArtistOne == valueLyrics) {
		console.log("artist one was clicked")
		responseCorrect.removeAttribute("class","hide");
		setTimeout(function(){
			responseCorrect.setAttribute("class","hide");
		},3000)
	} else {
		responseIncorrect.removeAttribute("class","hide")
		setTimeout(function(){
		responseIncorrect.setAttribute("class","hide");
		},3000)
		console.log(valueArtistOne)
		console.log(valueLyrics)
		// quizEnd()
	}
})

// incorrect answer
dataChoiceA.addEventListener("click", ()=>{
	console.log("random choice was clicked")
	if (valueDataItemA == valueLyrics) {
		responseCorrect.removeAttribute("class","hide");
		setTimeout(function(){
			responseCorrect.setAttribute("class","hide");
		},3000)
	} else {
		responseIncorrect.removeAttribute("class","hide")
		setTimeout(function(){
		responseIncorrect.setAttribute("class","hide");
		},3000)
		quizEnd()
	}
})

function quizEnd() {
	easyQuiz.setAttribute("class","hide")
	endScreen.removeAttribute("class","hide")
}

// submitBtn.onclick = savehighscore()
function savehighscore() {
	var name = nameEl.value.trim(); // variable for initials

	// gets highscore array and adds new data to highscore array if initals are present
	if (name !== "") {
		var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
		var newScore = {
		score: time,
		name: name
		};

		// adds highscores to string and adds them to score.html from local storage
		highscores.push(newScore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));

		window.location.href = "highscores.html";
	}
}
