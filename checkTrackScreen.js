function checkTrackScreen() {

    if (localStorage.getItem("pista") === null) {
        trackScreen.innerText = "Record a track";
    } else {
        trackScreen.innerText = "Track recorded";
    }
}
