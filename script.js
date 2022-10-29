//EVENT LISTENERS
window.addEventListener('keydown', playSound);
window.addEventListener('keyup', removePressed);
const screenArrowUp = document.getElementById(`arrow-up`);
screenArrowUp.addEventListener("click", arrow);
const screenArrowDown = document.getElementById(`arrow-down`);
screenArrowDown.addEventListener("click", arrow);
const recordButton = document.getElementById(`record`);
const playButton = document.getElementById(`play`);
recordButton.addEventListener("click", record)
playButton.addEventListener("click", playRecording)


const displayKeys = [];


let grabando = false;
function record(){
    
    if(grabando === true) {
        grabando = false;
        recordButton.className = "no-recording"
    } else if (grabando === false) {
        grabando = true;
        recordButton.className = "recording"
    }
    console.log(grabando)
}
function playRecording(){
    let pista;
    if (localStorage.getItem("pista") === null) {
        pista = [];
        console.log("Record something biatch!")
    } else {
        pista = JSON.parse(localStorage.getItem("pista"));
        pista.forEach((sound, i) => {
            setTimeout(() => {
                console.log(sound);
            }, i*1000);
        })
    }
}
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.key}"]`);
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    const led = document.getElementById(`led`);
    const screen = document.getElementById(`screen-playing`);
    if(!key) return;
    
    if (grabando === true){
        let pista;
        if (localStorage.getItem("pista") === null) {
            pista = [];
        } else {
            pista = JSON.parse(localStorage.getItem("pista"));
        }
        const sound = [];
        sound[0] = (e.key);
        sound[1] = Date.now();
        
        pista.push(sound);
        window.localStorage.setItem("pista", JSON.stringify(pista));
    }
    displayKeys.push(e.key)
    const displayLastKeys = displayKeys.slice(Math.max(displayKeys.length - 10, 1))
    screen.innerText = displayLastKeys.join('');
    key.classList.add('playing');
    led.classList.add('led--on');
    audio.currentTime = 0;
    audio.play();
    //
}
//Removes PLAYING class
function removePressed(e) {
    const key = document.querySelector(`.key[data-key = "${e.key}"]`);  
    const led = document.getElementById(`led`);
    if(!key) return;
    key.classList.remove('playing');
    led.className = `led--off`
}
function arrow(){
    const map1 = document.getElementById('1');
    if (map1 != null){ //Map 1 is selected
        selectMap2();
    } else { //Select map 2
        selectMap1();
    }
}
function selectMap1(){
    //Mapa 1
    const mapID = document.querySelector(`.keys`)
    mapID.id = 1;
    const screenTittle = document.getElementById(`screen-tittle`);
    screenTittle.innerText = `#1 : Basic Pack`;

    const audioQ = document.querySelector(`audio[data-key="q"]`);
    audioQ.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/clap.wav";
    const keyQ = document.getElementById(`q`);
    keyQ.innerText = `Clap`;

    const audioW = document.querySelector(`audio[data-key="w"]`);
    audioW.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/hihat.m4a";
    const keyW = document.getElementById(`w`);
    keyW.innerText = `Hi-hat`;

    const audioE = document.querySelector(`audio[data-key="e"]`);
    audioE.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/percussion.wav";
    const keyE = document.getElementById(`e`);
    keyE.innerText = `Perc #1`;

    const audioR = document.querySelector(`audio[data-key="r"]`);
    audioR.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/percz.wav";
    const keyR = document.getElementById(`r`);
    keyR.innerText = `Perc #2`;
    
    const audioT = document.querySelector(`audio[data-key="t"]`);
    audioT.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/percz_bubble.wav";
    const keyT = document.getElementById(`t`);
    keyT.innerText = `Perc #3`;

    const audioA = document.querySelector(`audio[data-key="a"]`);
    audioA.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/kick.wav";
    const keyA = document.getElementById(`a`);
    keyA.innerText = `Kick #1`;

    const audioS = document.querySelector(`audio[data-key="s"]`);
    audioS.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/kick_melodic.wav";
    const keyS = document.getElementById(`s`);
    keyS.innerText = `Kick #2`;

    const audioD = document.querySelector(`audio[data-key="d"]`);
    audioD.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/snare.wav";
    const keyD = document.getElementById(`d`);
    keyD.innerText = `Snare`;

    const audioF = document.querySelector(`audio[data-key="f"]`);
    audioF.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/gun.wav";
    const keyF = document.getElementById(`f`);
    keyF.innerText = `Sound #1`;

    const audioG = document.querySelector(`audio[data-key="g"]`);
    audioG.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/sound_2.wav";
    const keyG = document.getElementById(`g`);
    keyG.innerText = `Sound #2`;
}
function selectMap2(){
    //Mapa 2
    const mapID = document.querySelector(`.keys`)
    mapID.id = 2;
    const screenTittle = document.getElementById(`screen-tittle`);
    screenTittle.innerText = `#2 : Jungle Pack`;

    const audioQ = document.querySelector(`audio[data-key="q"]`);
    audioQ.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/bass.wav";
    const keyQ = document.getElementById(`q`);
    keyQ.innerText = `Bass`;

    const audioW = document.querySelector(`audio[data-key="w"]`);
    audioW.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/jungle_kick.wav";
    const keyW = document.getElementById(`w`);
    keyW.innerText = `Kick #1`;

    const audioE = document.querySelector(`audio[data-key="e"]`);
    audioE.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/jungle_kick_2.wav";
    const keyE = document.getElementById(`e`);
    keyE.innerText = `Kick #2`;

    const audioR = document.querySelector(`audio[data-key="r"]`);
    audioR.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/jungle_snare_1.wav";
    const keyR = document.getElementById(`r`);
    keyR.innerText = `Snare #1`;
    
    const audioT = document.querySelector(`audio[data-key="t"]`);
    audioT.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/jungle_snare_2.wav";
    const keyT = document.getElementById(`t`);
    keyT.innerText = `Snare #2`;

    const audioA = document.querySelector(`audio[data-key="a"]`);
    audioA.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/white.wav";
    const keyA = document.getElementById(`a`);
    keyA.innerText = `White`;

    const audioS = document.querySelector(`audio[data-key="s"]`);
    audioS.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/fm.wav";
    const keyS = document.getElementById(`s`);
    keyS.innerText = `Dry`;

    const audioD = document.querySelector(`audio[data-key="d"]`);
    audioD.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/hitubula.wav";
    const keyD = document.getElementById(`d`);
    keyD.innerText = `Hitubula`;

    const audioF = document.querySelector(`audio[data-key="f"]`);
    audioF.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/yes.wav";
    const keyF = document.getElementById(`f`);
    keyF.innerText = `Yes`;

    const audioG = document.querySelector(`audio[data-key="g"]`);
    audioG.src = "file:///Users/harrypotter/.bitnami/stackman/machines/xampp/volumes/root/htdocs/code/drum-pad/sounds/hue.wav";
    const keyG = document.getElementById(`g`);
    keyG.innerText = `Hue`;
}

selectMap1();