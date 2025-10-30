console.log("welcome to pulsify");

let masterplay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById("myProgressbar");
let songplay = document.getElementsByClassName('songplay');
let previousplay = document.getElementById('previousplay');
let nextplay = document.getElementById('nextplay');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById("songInfo");
let playEach = Array.from(document.getElementsByClassName("playEach"));
let timeProgress = document.getElementById('timeProgress');
let duration = document.getElementById('duration');

let songs = [
    { songName: "Softly",                 filePath: 'songs/softly.mp3',                    coverPath:'covers/1.jpg',                  artist: 'Karan Aujla, Ikky'},
    { songName: "Dil Diyan Gallan",       filePath: 'songs/Dil Diyan Gallan.mp3',      coverPath:'covers/2.png',                  artist: 'Atif Aslam'},
    { songName: "Finding Her",              filePath: 'songs/Finding Her.mp3',         coverPath:'covers/3.jpeg',                  artist: 'Kushagra, Bharath, Saaheal'},
    { songName: "Meethi Boliyaan",          filePath: 'songs/Meethi Boliyaan.mp3',        coverPath:'covers/Meethi Boliyan.jpeg',  artist: 'Amit Trivedi, Mili Nair'},
    { songName: "Sunday",                  filePath: 'songs/Sunday.mp3',            coverPath:'covers/Sunday.jpeg',              artist: 'Aditya A, NAALAYAK'},
    { songName: "Aaj Ki Raat(From stree-2)",filePath: 'songs/Aaj Ki Raat.mp3',         coverPath:'covers/Aaj Ki Raat.jpg',            artist: 'Amitabh Bhattacharya, Sachin jigar'},
    { songName: "Dandelions",              filePath: 'songs/Dandelions-slowed+reverb.mp3',coverPath:'covers/Dandelions.jpg',          artist: 'Ruth B, Slater'},
    { songName: "Megham Karukatha",        filePath: 'songs/Megham Karukatha.mp3',     coverPath:'covers/Megham Karukatha.jpg',       artist: 'dhanush, Anirudh Ravichander'},
    { songName: "NEXT! - Slowed",          filePath: 'songs/NEXT! - Slowed.mp3',       coverPath:'covers/NEXT! - Slowed.jpg',         artist: 'NCTS'},
    { songName: "Shape of You",            filePath: 'songs/Shape of You.mp3',         coverPath:'covers/Shape of You.jpg',           artist: 'Ed Sheeran'},
]

//for setup ui of songs
songItem.forEach((element, i)=>{
    let audio = new Audio(songs[i].filePath);
    audio.addEventListener("loadedmetadata", () => {
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        element.getElementsByClassName("timestamp")[0].innerText = `${minutes}:${seconds}`;
    });
    
    element.getElementsByTagName("img")[0].src = songs.at(i).coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs.at(i).songName;
})


let songIndex = 0;
let audioElement = new Audio(songs.at(songIndex).filePath);

//to set the system of new song and update ui
function newsongplay(){
    audioElement.pause();                                    //stop old music
    audioElement.src = songs.at(songIndex).filePath;  //update new music variable
    audioElement.play();

    //update bottom bar
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    songInfo.getElementsByTagName("img")[0].src = songs.at(songIndex).coverPath;
    songInfo.getElementsByClassName("songName")[0].innerText = songs.at(songIndex).songName;
    songInfo.getElementsByClassName("artistName")[0].innerText = songs.at(songIndex).artist;
    audioElement.addEventListener('timeupdate', ()=>{
        let minute = Math.floor(audioElement.duration / 60);
        let second = Math.floor(audioElement.duration % 60).toString().padStart(2, '0');
        duration.innerText = `${minute}:${second}`;

        minute = Math.floor(audioElement.currentTime / 60);
        second = Math.floor(audioElement.currentTime % 60).toString().padStart(2, '0');
        timeProgress.innerText = `${minute}:${second}`;
    })  

    //update song bar
    makeAllPlays();
    playEach.at(songIndex).classList.remove('fa-play');
    playEach.at(songIndex).classList.add('fa-pause');
}

const makeAllPlays = ()=>{
    playEach.forEach((e)=>{
        e.classList.remove('fa-pause');
        e.classList.add('fa-play');
    })
}

playEach.forEach((e, j)=>{
    e.addEventListener('click', (e)=>{
        if (songIndex === j && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');

            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            songIndex = j;
            newsongplay();
        }
    })

})

masterplay.addEventListener('click', ()=>{

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        playEach.at(songIndex).classList.remove('fa-play');
        playEach.at(songIndex).classList.add('fa-pause');
    }
    else{
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        audioElement.pause();
        gif.style.opacity = 0;
        playEach.at(songIndex).classList.add('fa-play');
        playEach.at(songIndex).classList.remove('fa-pause');
    }
    
})

previousplay.addEventListener('click', ()=>{
    if(songIndex == 0){
        songIndex = songs.length - 1;
    }
    else{
        songIndex = songIndex - 1;
    }
    
    newsongplay();
})

nextplay.addEventListener('click', ()=>{
    if(songIndex == 9) songIndex = 0;
    else songIndex = songIndex + 1;

    newsongplay();
})


audioElement.addEventListener('timeupdate', ()=>{
    let progress = (audioElement.currentTime/audioElement.duration)*100;
    myProgressbar.value = progress;
    console.log(progress)

    if(audioElement.currentTime >= audioElement.duration){
        if(songIndex == 9) songIndex = 0;
        else songIndex = songIndex + 1;           //if song end then next song played

        newsongplay();
    }
})

myProgressbar.addEventListener('input', ()=>{
    audioElement.currentTime = (myProgressbar.value/100) * audioElement.duration
})
