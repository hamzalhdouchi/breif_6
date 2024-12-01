let modal = document.getElementById("popup");
let modalPlayer = document.getElementById("Modalplayer");
let cardsContainer = document.getElementById("cards");
let scrol = document.getElementById("scrol")
let Name = document.getElementById("playerName");
let photo = document.getElementById("playerPhoto");
let position = document.getElementById("playerPosition");
let club = document.getElementById("playerClub");
let rating = document.getElementById("playerRating");
let pace = document.getElementById("playerPace");
let shooting = document.getElementById("playerShooting");
let passing = document.getElementById("playerPassing");
let dribbling = document.getElementById("playerDribbling");
let Defending = document.getElementById("playerDefending");
let Physical = document.getElementById("playerPhysical");

cardsContainer.addEventListener("wheel", (e) => {
    cardsContainer.scrollLeft += e.deltaX
})

let arry = []

function fetchData() {

    fetch('./Player.json')
        .then(response => response.json())
        .then(data => {
            const cards = data.players;

            arry = cards
            console.log("vdfjhdvdhjvdvbjs", arry);
            if (arry.length >= 0) {
                localStorage.setItem("players", JSON.stringify(arry));
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
}
fetchData();


function addPlayer() {
    if (!rigex()) {
        return;
    }

    let player = {
        name: Name.value,
        photo: photo.value,
        position: position.value,
        club: club.value,
        rating: rating.value,
        pace: pace.value,
        shooting: shooting.value,
        passing: passing.value,
        dribbling: dribbling.value,
        defending: Defending.value,
        physical: Physical.value,
    };

    let arryPlayer = JSON.parse(localStorage.getItem("players"));
    console.log(localStorage.getItem("players"));

    arryPlayer.push(player);
    localStorage.setItem("players", JSON.stringify(arryPlayer));

    console.log(arry);

    console.log("done:", player);

    clearInput();
}