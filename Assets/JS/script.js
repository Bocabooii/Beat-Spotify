var startGame = document.getElementById("startGamebtn");
var artistOne = document.getElementById("artistOne")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d1ed2a192msh98939cb7c479eaap1118bajsn8c8e3a534674',
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

// 
var getMusicById = function(id) {
	fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${id}`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];  
}

// allows for multiple actions to happen on one click
startGame.addEventListener("click", ()=>{
	console.log("start button works")
	getPopularMusic();
})

// gets billboard top 100 playlist
fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6UeSakyzhiEt4NB3UAd6NQ&offset=0&limit=10', options)
	.then(response => response.json())
	.then(response => {
		console.log(response.items[0].track.album.images[0].url) // logs the img url for the first song
		var albumImg = response.items[1].track.album.images[0].url
		artistOne.innerHTML = "<img src=" + albumImg + ">" // adds the img url to html formatting and displayed in page

		var randomAlbumImg = random_item(response.items.track.album.images[0].url); 
		console.log(randomAlbumImg)
	})
	.catch(err => console.error(err));

const optionsGenius = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d1ed2a192msh98939cb7c479eaap1118bajsn8c8e3a534674',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};
	
fetch('https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=8821223&text_format=plain', optionsGenius)
	.then(response => response.json())
	.then(response => {
	var textLyric =	response.lyrics.lyrics.body.plain
	const arrayLyric = textLyric.split("[Chorus]")
	console.log(arrayLyric[1].split("[")[0])
	
	})

	.catch(err => console.error(err));
