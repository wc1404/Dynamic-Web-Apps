//basic code
class Song{
    constructor({ name, author, url, cover } = {}){
        this.name = name;
        this.author = author;
        this.url = url;
        this.cover = cover;
    }
}

class Jukebox{
    constructor(songList, 
        { shuffleBtn, beforeBtn, playBtn, nextBtn, stopBtn} = {}, 
        {songPosition, sourcePosition, coverPosition, listPosition, namePosition, authorPosition},){
        this.songList = songList;
        this.currentList = this.songList;
        this.currentSongIndex = 0;
        this.currentSong = this.currentList[this.currentSongIndex];
        this.currentSongIsPlaying = false;

        this.songPosition = songPosition;
        this.sourcePosition = sourcePosition;
        this.coverPosition = coverPosition;
        this.listPosition = listPosition;
        this.namePosition = namePosition;
        this.authorPosition = authorPosition;

        this.buttons = {
            shuffleBtn,
            beforeBtn,
            playBtn,
            nextBtn,
            stopBtn
        };

        this.setup = this.setup.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.setup = this.setup.bind(this);
        this.play = this.play.bind(this);
        this.toBefore = this.toBefore.bind(this);
        this.toNext = this.toNext.bind(this);
    }

    update(){
        this.currentSong = this.currentList[this.currentSongIndex];
        this.coverPosition.src = this.currentSong.cover;
        this.sourcePosition.src = this.currentSong.url;
        this.namePosition.innerHTML = this.currentSong.name;
        this.authorPosition.innerHTML = "By " + this.currentSong.author;

        //update style of song playing in the list
        let listItems = document.getElementsByTagName("li");
        
        for(let i = 0; i < this.currentList.length; i++){
            if(i === this.currentSongIndex){
                listItems[i].setAttribute("class", "playing");
            }else{
                listItems[i].classList.remove("playing");
            }
        }

        //update play button
        if(this.currentSongIsPlaying){
            //this.buttons.playImg.src = "./assets/UI/play.png";
        }else{
            //this.buttons.playImg.src = "./assets/UI/pause.png";
        }

        this.songPosition.load();
    }

    updateList(){
        const listItems = document.getElementsByTagName("li");
        for(let j = 0; j < this.currentList.length; j++){
            listItems[j].innerHTML = this.currentList[j].name;
            listItems[j].classList.remove("playing");
        }

        listItems[this.currentSongIndex].setAttribute("class", "playing");
    }

    setup(){
        //basic setup
        this.sourcePosition.src = this.currentSong.url;
        this.coverPosition.src = this.currentSong.cover;
        this.songPosition.load();
        this.namePosition.innerHTML = this.currentSong.name;
        this.authorPosition.innerHTML = "By " + this.currentSong.author;
        
        for(let i = 0; i < this.currentList.length; i++){
            const item = document.createElement("li");
            const itemContent = document.createTextNode(this.currentList[i].name);

            item.appendChild(itemContent);
            if(i === 0){
                item.setAttribute("class", "playing");
            }

            item.setAttribute("id", i);
            this.listPosition.appendChild(item);
            item.addEventListener("click", toThisSong);
        }

        //button setup
        this.buttons.shuffleBtn.addEventListener("click", ()=>{
            this.shuffle();
        });

        this.buttons.beforeBtn.addEventListener("click", ()=>{
            this.toBefore();
        });

        this.buttons.playBtn.addEventListener("click", ()=>{
            this.play();

        });

        this.buttons.nextBtn.addEventListener("click", ()=>{
            this.toNext();
        });

        this.buttons.stopBtn.addEventListener("click", ()=>{
            this.stop();
        });

        this.update();
    }

    shuffle(){
        //radominze the list
        for(let i = this.currentList.length - 1; i >=0; i--){
            let randomInd = Math.floor(Math.random() * this.currentList.length);

            let tempSong = this.currentList[i];

            this.currentList[i] = this.currentList[randomInd];
            this.currentList[randomInd] = tempSong;
        }

        this.currentSongIsPlaying = false;
        this.currentSongIndex = 0;

        //setup

        this.update();
        this.updateList();
    }

    play(){
        if(this.currentSongIsPlaying){
            this.songPosition.pause();
            this.coverPosition.classList.add('spinPause');
        }else{
            this.songPosition.play();
            this.coverPosition.classList.add('spin');
            this.coverPosition.classList.remove('spinPause');
        }

        this.currentSongIsPlaying = !this.currentSongIsPlaying;
    }

    toBefore(){
        if(this.currentSongIndex === 0){
            this.currentSongIndex = this.currentList.length - 1;
        }else{
            this.currentSongIndex -= 1;
        }

        this.currentSongIsPlaying = false;
        this.coverPosition.classList.add('spinPause');
        this.coverPosition.classList.remove('spin');
        this.update();
    }

    toNext(){
        if(this.currentSongIndex === this.currentList.length - 1){
            this.currentSongIndex = 0;
        }else{
            this.currentSongIndex += 1;
        }
        
        this.currentSongIsPlaying = false;
        this.coverPosition.classList.add('spinPause');
        this.coverPosition.classList.remove('spin');
        this.update();
    }

    stop(){
        this.currentSongIsPlaying = false;
        this.coverPosition.classList.add('spinPause');
        this.coverPosition.classList.remove('spin');
        this.update();
        this.updateList();
    }

    toThisSong(index){
        this.currentSongIndex = index;
        this.coverPosition.classList.add('spinPause');
        this.coverPosition.classList.remove('spin');
        this.update();
        this.updateList();
    }
}

//using code
const addicted = new Song({
    name: "Addicted",
    author: "Makaih Beats",
    url: "./assets/music/Addicted_Makaih_Beats.mp3",
    cover: "./assets/cover/Addicted_Makaih_Beats.png"
});


const memory = new Song({
    name: "Lost One's Memories",
    author: "Sasi Bell",
    url: "./assets/music/Lost_One's_Memories.mp3",
    cover: "./assets/cover/Lost_One's_Memories.jpg"
});

const ceeday = new Song({
    name: "Ceeday",
    author: "SkullOfNinja",
    url: "./assets/music/ceeday.mp3",
    cover: "./assets/cover/ceeday.jpg"
})

const never_enough = new Song({
    name: "Never Enough",
    author: "Cimorelli, James Charles",
    url: "./assets/music/Never_Enough.mp3",
    cover: "./assets/cover/never_enough.jpg"
});

const ocean_eyes = new Song({
    name: "Ocean Eyes",
    author: "Billie Eilish",
    url: "./assets/music/Ocean_Eyes.mp3",
    cover: "./assets/cover/ocean_eyes.jpg"
});

const lovely = new Song({
    name: "Lovely",
    author: "Billie Eilish (with Khalid)",
    url: "./assets/music/lovely.mp3",
    cover: "./assets/cover/lovely.jpg"
});

const kirby = new Song({
    name: "Kirby",
    author: "Chahine",
    url: "./assets/music/Kirby.mp3",
    cover: "./assets/cover/kirby.jpg"
});

const groove = new Song({
    name: "Concrete Jungle",
    author: "Dr. Groove Gang",
    url: "./assets/music/DR_GROOVE_GANG_concrete_jungle.mp3",
    cover: "./assets/cover/concrete_jungle.png"
});

const lonely = new Song({
    name: "Dark Room Full of Lonely People",
    author: "Dutilleul",
    url: "./assets/music/Dutilleul_Dark_Room_Full_of_Lonely_People.mp3",
    cover: "./assets/cover/dark_room_full_of_lonely_people.png"
});

const vibes = new Song({
    name: "Good Vibes Only",
    author: "Elephant Funeral",
    url: "./assets/music/Elephant_Funeral_Good_Vibes_Only.mp3",
    cover: "./assets/cover/good_vibes_only.png"
});

const phoneline = new Song({
    name: "Phoneline",
    author: "Samie Bower",
    url: "./assets/music/Samie_Bower_Phoneline.mp3",
    cover: "./assets/cover/phoneline.png"
});

const rust = new Song({
    name: "Rust",
    author: "Young Kartz",
    url: "./assets/music/Yung_Kartz_Rust.mp3",
    cover: "./assets/cover/rust.png"
});

const songList = [addicted, memory, ceeday, never_enough, ocean_eyes, lovely, kirby, groove, lonely, vibes, phoneline, rust];

//get dom elements
const coverPosition = document.getElementById("cover");
const songPosition = document.getElementById("song");
const sourcePosition = document.getElementById("source");
const listPosition = document.getElementById("list");
const namePosition = document.getElementById("name");
const authorPosition = document.getElementById("author");

const positions = {
    coverPosition,
    songPosition,
    sourcePosition,
    listPosition,
    namePosition,
    authorPosition
}

const buttons = {
    shuffleBtn: document.getElementById("shuffle"),
    beforeBtn: document.getElementById("before"),
    playBtn: document.getElementById("play"),
    nextBtn: document.getElementById("next"),
    stopBtn: document.getElementById("stop"),
}

const pandamonium = new Jukebox(songList, buttons, positions);

const toThisSong = (e) => {
    const index = e.target.id;
    pandamonium.toThisSong(index);
}

pandamonium.setup();