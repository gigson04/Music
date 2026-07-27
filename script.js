/*=========================================
Spotify Love Player
Part 1
=========================================*/

const songs = [

{
title:"Until I Found You",
artist:"Stephen Sanchez",
src:"FoundYou.mp3",
cover:"FoundYou.png"
},

{
title:"Perfect",
artist:"Ed Sheeran",
src:"Perfect.mp3",
cover:"Perfect.jpg"
},

{
title:"I Thought I Saw Your Face Today",
artist:"She & Him",
src:"IThoughtISawYourFaceToday.mp3",
cover:"IThoughtISawYourFaceToday.jpeg"
},

{
title:"Magnolia",
artist:"Magnolia Celebration",
src:"Magnolia.mp3",
cover:"Magnolia.jpg"
},

{
title:"Die With A Smile",
artist:"Bruno Mars & Lady Gaga",
src:"DieWithASmile.mp3",
cover:"DieWithASmile.jpg"
}

];

const notes=[

"Every song reminds me of you ❤️",

"I'd choose you in every lifetime ❤️",

"You are my favourite person ❤️",

"My heart belongs to you ❤️",

"I love you forever ❤️"

];

const audio=document.getElementById("audio");

const play=document.getElementById("play");
const next=document.getElementById("next");
const previous=document.getElementById("previous");

const shuffle=document.getElementById("shuffle");
const repeat=document.getElementById("repeat");

const volume=document.getElementById("volume");

const progress=document.getElementById("progress");
const progressBar=document.getElementById("progressBar");

const currentTime=document.getElementById("currentTime");
const duration=document.getElementById("duration");

const cover=document.getElementById("cover");
const coverImage=document.getElementById("coverImage");

const title=document.getElementById("title");
const artist=document.getElementById("artist");

const playlist=document.getElementById("playlist");

const vinyl=document.getElementById("vinyl");

let currentSong=0;

let shuffleMode=false;

let repeatMode=false;

function loadSong(index){

const song=songs[index];

audio.src=song.src;

cover.src=song.cover;

coverImage.src=song.cover;

title.innerText=song.title;

artist.innerText=song.artist;

highlightSong();

}

function playSong(){

audio.play();

play.innerHTML="⏸";

vinyl.classList.add("play");

}

function pauseSong(){

audio.pause();

play.innerHTML="▶";

vinyl.classList.remove("play");

}

play.onclick=()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

};

next.onclick=()=>{

if(shuffleMode){

currentSong=Math.floor(Math.random()*songs.length);

}else{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

}

loadSong(currentSong);

playSong();

};

previous.onclick=()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

};

shuffle.onclick=()=>{

shuffleMode=!shuffleMode;

shuffle.style.color=shuffleMode?"hotpink":"white";

};

repeat.onclick=()=>{

repeatMode=!repeatMode;

repeat.style.color=repeatMode?"hotpink":"white";

};

volume.oninput=()=>{

audio.volume=volume.value/100;

};

audio.addEventListener("ended",()=>{

if(repeatMode){

playSong();

return;

}

next.click();

});

audio.addEventListener("loadedmetadata",()=>{

duration.innerHTML=format(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

currentTime.innerHTML=format(audio.currentTime);

const percent=(audio.currentTime/audio.duration)*100;

progress.style.width=percent+"%";

});

function format(sec){

let m=Math.floor(sec/60);

let s=Math.floor(sec%60);

if(s<10)s="0"+s;

return `${m}:${s}`;

}

function buildPlaylist(){

playlist.innerHTML="";

songs.forEach((song,index)=>{

const li=document.createElement("li");

li.innerHTML=`

<img src="${song.cover}" width="50">

<div>

<b>${song.title}</b>

<br>

<small>${song.artist}</small>

</div>

`;

li.onclick=()=>{

currentSong=index;

loadSong(index);

playSong();

};

playlist.appendChild(li);

});

}

function highlightSong(){

document.querySelectorAll("#playlist li").forEach((item,i)=>{

item.classList.toggle("active",i===currentSong);

});

}

loadSong(currentSong);

buildPlaylist();

audio.volume=.7;

/*=========================================
Spotify Love Player
Part 2
Love Notes
Progress Seeking
Favorite
Surprise Letter
Gallery
Hearts
Particles
Keyboard
=========================================*/

/* ---------- LOVE NOTES ---------- */

const loveNote = document.getElementById("loveNote");

let noteIndex = 0;

setInterval(() => {

    loveNote.classList.add("fade");

    setTimeout(() => {

        noteIndex++;

        if (noteIndex >= notes.length)
            noteIndex = 0;

        loveNote.innerHTML = notes[noteIndex];

    }, 250);

    setTimeout(() => {

        loveNote.classList.remove("fade");

    }, 500);

}, 5000);

/* ---------- SEEK BAR ---------- */

progressBar.addEventListener("click", (e) => {

    const rect = progressBar.getBoundingClientRect();

    const percent = (e.clientX - rect.left) / rect.width;

    audio.currentTime = percent * audio.duration;

});

/* ---------- FAVORITE ---------- */

const favorite = document.getElementById("favorite");

let liked = false;

favorite.onclick = () => {

    liked = !liked;

    favorite.innerHTML = liked ? "❤️" : "♡";

    localStorage.setItem("loveFavorite", liked);

};

window.addEventListener("load", () => {

    const save = localStorage.getItem("loveFavorite");

    if (save === "true") {

        liked = true;

        favorite.innerHTML = "❤️";

    }

});

/* ---------- SURPRISE LETTER ---------- */

const surprise = document.getElementById("surprise");

const loveButton = document.getElementById("loveButton");

const closeLetter = document.getElementById("closeLetter");

loveButton.onclick = () => {

    surprise.classList.add("show");

    createHearts(50);

};

closeLetter.onclick = () => {

    surprise.classList.remove("show");

};

/* ---------- SECRET GALLERY ---------- */

const gallery = document.getElementById("galleryModal");

const closeGallery = document.getElementById("closeGallery");

let secretClicks = 0;

coverImage.onclick = () => {

    secretClicks++;

    if (secretClicks >= 5) {

        gallery.classList.add("show");

        secretClicks = 0;

    }

};

closeGallery.onclick = () => {

    gallery.classList.remove("show");

};

/* ---------- FLOATING HEARTS ---------- */

function createHearts(amount = 15) {

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize = (15 + Math.random() * 35) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 9000);

    }

}

/* create hearts every few seconds */

setInterval(() => {

    createHearts(2);

}, 2500);

/* ---------- PARTICLES ---------- */

function createParticle() {

    const p = document.createElement("div");

    p.className = "particle";

    p.style.left = Math.random() * 100 + "vw";

    p.style.bottom = "-10px";

    p.style.width = (3 + Math.random() * 6) + "px";

    p.style.height = p.style.width;

    p.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    document.body.appendChild(p);

    setTimeout(() => {

        p.remove();

    }, 10000);

}

setInterval(createParticle, 350);

/* ---------- KEYBOARD SHORTCUTS ---------- */

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        play.click();

    }

    if (e.code === "ArrowRight") {

        next.click();

    }

    if (e.code === "ArrowLeft") {

        previous.click();

    }

});

/* ---------- TOUCH SWIPE ---------- */

let touchStart = 0;

document.addEventListener("touchstart", (e) => {

    touchStart = e.changedTouches[0].screenX;

});

document.addEventListener("touchend", (e) => {

    const end = e.changedTouches[0].screenX;

    if (end - touchStart > 80) {

        previous.click();

    }

    if (touchStart - end > 80) {

        next.click();

    }

});

/* ---------- FADE SONG CHANGE ---------- */

audio.addEventListener("play", () => {

    document.querySelector(".player").classList.add("fade");

    setTimeout(() => {

        document.querySelector(".player")
            .classList.remove("fade");

    }, 500);

});

/* ---------- AUTO HEART BURST ---------- */

audio.addEventListener("play", () => {

    createHearts(20);

});

/* ---------- WELCOME MESSAGE ---------- */

setTimeout(() => {

    console.log("❤️ Welcome to your Love Playlist ❤️");

}, 1000);

/* ---------- END OF PART 2 ---------- */
