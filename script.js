//EVENT LISTENERS
window.addEventListener('keydown', handleKeyPress);
window.addEventListener('keyup', removePressed);
window.addEventListener('DOMContentLoaded', menu);

let recordButton = document.getElementById(`record`);
let recordKey = document.getElementById('action');
const playButton = document.getElementById(`play`);
recordButton.addEventListener("click", record)
playButton.addEventListener("click", playRecord)
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", restartPista);
window.addEventListener('DOMContentLoaded', checkTrackScreen);
const trackScreen = document.getElementById("track-screen");
const trackScreenLabel = document.createElement('label')
trackScreen.appendChild(trackScreenLabel)

const displayKeys = [];

function handleKeyPress(e){
    playSoundAssignedToKey(e.key);
}
function playSoundAssignedToKey(pressedKey) {
    const audio = document.querySelector(`audio[data-key="${pressedKey}"]`);
    const key = document.querySelector(`.key[data-key="${pressedKey}"]`);
    const led = document.getElementById(`led`);
    const screen = document.getElementById(`screen-playing`);
    if(!key) return;

    //Records pressed keys and stores it into an array
    if (grabando === true){
        let pista;
        if (localStorage.getItem("pista") === null) {
            pista = [];
        } else {
            pista = JSON.parse(localStorage.getItem("pista"));
        }
        const sound = [];
        sound[0] = (pressedKey);
        sound[1] = Date.now();
        if (pista.length == 0) {
            sound[2] = 0;
            sound[3] = Date.now();
        } else {
        sound[2] = Date.now() - pista[0][3];
            //sound[2] = Date.now() - pista[pista.length - 1][1]
        }
        pista.push(sound);
        window.localStorage.setItem("pista", JSON.stringify(pista));
        console.log(sound[2])
    }
    //Displays the last 10 pressed keys on the screen
    displayKeys.push(pressedKey)
    const displayLastKeys = displayKeys.slice(Math.max(displayKeys.length - 10, 1))
    screen.innerText = displayLastKeys.join('');

    key.classList.add('playing');
    led.classList.add('led--on');
    audio.currentTime = 0; 
    audio.play();
}
//Reproduce las pistas grabadas
function playRecord(pressedKey){
    let pista;
    if (localStorage.getItem("pista") === null) {
        pista = [];
        trackScreenLabel.innerText = "Nothing recorded"
    } else {
        pista = JSON.parse(localStorage.getItem("pista"));
        pista.forEach((sound, i) => {
            setTimeout(() => {
                const keySound = document.querySelector(`audio[data-key="${sound[0]}"]`);
                const key = document.querySelector(`.key[data-key="${sound[0]}"]`);
                keySound.currentTime = 0;
                keySound.play();
                key.classList.add('playing');
                if(key.classList.contains('playing')){
                    setTimeout(() => {
                        key.classList.remove('playing')
                    }, 70);
                }
            },sound[2]);
        })
    }
}
//Removes PLAYING class
function removePressed(pressedKey) {
    const key = document.querySelector(`.key[data-key = "${pressedKey.key}"]`);  
    const led = document.getElementById(`led`);
    if(!key) return;
    key.classList.remove('playing');
    led.className = `led--off`
}
let grabando = false;
function record(){
    if(grabando === true) {
        grabando = false;
        recordButton.className = "no-recording"
        trackScreenLabel.classList.remove('recording')
        checkTrackScreen();
    } else if (grabando === false) {
        grabando = true;
        recordButton.className = "recording"
        trackScreenLabel.innerText = "Recording"
        trackScreenLabel.classList.add('recording');
    }
}
function restartPista(){
    if (localStorage.getItem("pista") === null) {
        pista = [];
    } else {
        localStorage.removeItem("pista")
        pista = [];
    }
    checkTrackScreen();
}
//Checks if a track is loaded into Localstorage
function checkTrackScreen(){
    if (localStorage.getItem("pista") === null) {
        trackScreenLabel.innerText = "Record a track";
    } else {
        trackScreenLabel.innerText = "Track in memory";
    }
}
//Moving through maps and maps construction
function menu(){
    const screenArrowUp = document.getElementById(`arrow-up`);
    const screenArrowDown = document.getElementById(`arrow-down`);
    screenArrowUp.addEventListener("click", arrowUp);
    screenArrowDown.addEventListener("click", arrowDown);

    menuChecker();

    function arrowUp(){
        if (menuIndex < 2){
            menuIndex ++;
            window.localStorage.setItem("menuIndex", menuIndex)
            menuChecker();
        }
    }
    function arrowDown(){
        if (menuIndex > 0){
            menuIndex --;
            window.localStorage.setItem("menuIndex", menuIndex)
            menuChecker();
        }
    }
}

let menuIndex = 0;
function menuChecker(){
        if (menuIndex == 0){
            selectMap1();
            console.log(menuIndex);
        } else if (menuIndex == 1) {
            selectMap2();
            console.log(menuIndex);
        } else if (menuIndex == 2) {
            selectMap3();
        }
        
        function selectMap1(){
            //Mapa 1
            recordKey.style.display = "none";
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
            recordKey.style.display = "none";
            //Mapa 2
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
        function selectMap3(){

            recordKey.style.display = "";
            recordKey.addEventListener("click", handleAction)

            //Microphone recording for MAP 3
            const recordAudioQ = () =>
            new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            const start = () => mediaRecorder.start();

            const stop = () =>
                new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const recordedAudio = new Audio(audioUrl);

                    const audioQ = document.querySelector('audio[data-key="q"]');
                    audioQ.src = audioUrl;

                    const play = () => recordedAudio.play();
                    resolve({ audioBlob, audioUrl, play });
                });

                mediaRecorder.stop();
                });

            resolve({ start, stop });
            });

            const sleep = time => new Promise(resolve => setTimeout(resolve, time));

            const handleAction = async () => {
                const recorder = await recordAudioQ();
                const actionButton = document.getElementById("action");
                actionButton.disabled = true;
                recorder.start();
                await sleep(1500);
                const audio = await recorder.stop();
                audio.play();
                await sleep(1500);
                actionButton.disabled = false;
                console.log("recording");
            };          

            const screenTittle = document.getElementById(`screen-tittle`);
            screenTittle.innerText = `#3 : Record your Pack`;
        
            const audioQ = document.querySelector(`q`);
            //audioQ.src = "";
            const keyQ = document.getElementById('q')
            keyQ.innerText = ``;
        
            const audioW = document.querySelector(`audio[data-key="w"]`);
           // audioW.src = "";
            const keyW = document.getElementById(`w`);
            keyW.innerText = ``;
        
            const audioE = document.querySelector(`audio[data-key="e"]`);
           // audioE.src = "";
            const keyE = document.getElementById(`e`);
            keyE.innerText = ``;
        
            const audioR = document.querySelector(`audio[data-key="r"]`);
            // audioR.src = "";
            const keyR = document.getElementById(`r`);
            keyR.innerText = ``;
            
            const audioT = document.querySelector(`audio[data-key="t"]`);
           // audioT.src = "";
            const keyT = document.getElementById(`t`);
            keyT.innerText = ``;
        
            const audioA = document.querySelector(`audio[data-key="a"]`);
            //audioA.src = "";
            const keyA = document.getElementById(`a`);
            keyA.innerText = ``;
        
            const audioS = document.querySelector(`audio[data-key="s"]`);
            //audioS.src = "";
            const keyS = document.getElementById(`s`);
            keyS.innerText = ``;
        
            const audioD = document.querySelector(`audio[data-key="d"]`);
            //audioD.src = "";
            const keyD = document.getElementById(`d`);
            keyD.innerText = ``;
        
            const audioF = document.querySelector(`audio[data-key="f"]`);
            //audioF.src = "";
            const keyF = document.getElementById(`f`);
            keyF.innerText = ``;
        
            const audioG = document.querySelector(`audio[data-key="g"]`);
            //audioG.src = "";
            const keyG = document.getElementById(`g`);
            keyG.innerText = ``;
        }
    }