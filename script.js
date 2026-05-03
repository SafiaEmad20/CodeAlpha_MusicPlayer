// --- script.js ---

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');


const songs = [
    {
        file: 'song1.mp3', 
        title: 'The Night We Met',
        artist: 'Lord Huron ',
        cover: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&auto=format&fit=crop'
    },
    {
        file: 'song2.mp3', 
        title: 'young and beautiful',
        artist: 'lana del rey',
        cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=400&auto=format&fit=crop'
    },
    {
        file: 'song3.mp3', 
        title: 'we fell in love in october',
        artist: 'Girl in Red',
        cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop'
    }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.file; 
    cover.src = song.cover;
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    cover.parentElement.classList.add('spin');
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    cover.parentElement.classList.remove('spin');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.value = progressPercent;

            let currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
            currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

            let durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
        }
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audio.volume = volumeBar.value;
}

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', setProgressBar);
volumeBar.addEventListener('input', setVolume);
audio.addEventListener('ended', nextSong);

// Load First Song
loadSong(songs[songIndex]);
audio.volume = volumeBar.value;