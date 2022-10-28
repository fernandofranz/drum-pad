function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.key}"]`);
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    const led = document.getElementById(`led`);
    if(!key) return;
    key.classList.add('playing');
    led.classList.add('led--on');
    audio.currentTime = 0;
    audio.play();
}
function removePressed(e) {
    const key = document.querySelector(`.key[data-key = "${e.key}"]`);  
    const led = document.getElementById(`led`);
    key.classList.remove('playing');
    led.className = `led--off`
}

//EVENT LISTENERS
window.addEventListener('keydown', playSound);
window.addEventListener('keyup', removePressed);