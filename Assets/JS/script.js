var startGame = document.getElementById("startGamebtn");
var artistOne = document.getElementById("artistOne");
var startScreen = document.getElementById("start-screen");
var easyQuiz = document.getElementById("easyQuiz");
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
var getPopularMusic = function() {
fetch('https://spotify23.p.rapidapi.com/search/?q=popular&type=tracks&offset=0&limit=10&numberOfTopResults=5', options)
    .then(response => response.json())
    .then(response => {
		console.log(response.tracks.items)
		var randomTrack = random_item(response.tracks.items);
		var trackId = randomTrack.data.id;
		console.log(trackId);
		console.log(randomTrack);
		getMusicById(trackId);
	})
    .catch(err => console.error(err));
}

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
	console.log("start button works")
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

// gets billboard top 100 playlist
var getSongItems = function () {
fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6UeSakyzhiEt4NB3UAd6NQ&offset=0&limit=15', options)
	.then(response => response.json())
	.then(response => {
		console.log(response.items) // logs all 10 songs fetched

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
		console.log(dataSet);
		var randomIndex = Math.floor(Math.random()*response.items.length);


		var trackName = response.items[randomIndex].track.name
		checkAnswer = trackName
		console.log(trackName)

		var artistName = response.items[randomIndex].track.artists[0].name
		console.log(artistName)

		// console.log(response.items[0].track.album.images[0].url) // logs the img url for the first song
		var albumImg = response.items[randomIndex].track.album.images[0].url
		artistOne.innerHTML = "<img src=" + albumImg + ">" // adds the img url to html formatting and displayed in page

		// use to get the song ID from genius
		fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${trackName + artistName}&per_page=1&page=1`, optionsGenius)
			.then(response => response.json())
			.then(response => { 
				if(response.hits.length !== 0){
					
				console.log(response)
				console.log(response.hits[0].result.id)
				getLyrics(response.hits[0].result.id)
			} else{
				getSongItems()
			}
				
			})
			.catch(err => console.error(err));

		// getting other album images for choices
		var randomItem = random_item(response.items)
		var randomOption = randomItem.track.album.images[0].url
		console.log(randomOption)
		randomChoice.innerHTML = "<img src="+randomOption+">"

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
	})
	

	.catch(err => console.error(err));
}
