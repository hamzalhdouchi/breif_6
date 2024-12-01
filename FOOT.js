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

function rigex() {

    const NamePattern = /^[a-zA-Z\s]{3,30}$/;
    const clubPattern = /^[a-zA-Z\s_-]{1,30}$/;
    const ratingPattern = /^[0-9]{1,2}$/;

    if (!NamePattern.test(Name.value)) {
        showAlert("Le titre doit être entre 3 et 10 caractères, seulement des lettres.");
        return false;
    }

    if (!clubPattern.test(club.value)) {
        showAlert("La name de club doit être entre 10 et 100 caractères, avec seulement des lettres, chiffres, et ponctuations.");
        return false;
    }

    if (!ratingPattern.test(rating.value) || !ratingPattern.test(pace.value) || !ratingPattern.test(shooting.value) || !ratingPattern.test(passing.value) || !ratingPattern.test(dribbling.value) || !ratingPattern.test(Defending.value) || !ratingPattern.test(Physical.value)) {
        showAlert("Le rating doit être un nombre entre 0 et 99.");
        return false;
    }
    return true;
}



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

function changer_lesstats(position) {

    if (position === "GK") {
      let ratin = document.getElementsByClassName("pace")[0].innerText = "rating"
      document.getElementsByClassName("shooting")[0].innerText = "diving"
      document.getElementsByClassName("passing")[0].innerText = "handling"
      document.getElementsByClassName("dribbling")[0].innerText = "kicking"
      document.getElementsByClassName("defending")[0].innerText = "reflexes"
      document.getElementsByClassName("physical")[0].innerText = "speed"
  
    } else {
      document.getElementsByClassName("pace")[0].innerText = "pace"
      document.getElementsByClassName("shooting")[0].innerText = "shooting"
      document.getElementsByClassName("passing")[0].innerText = "passing"
      document.getElementsByClassName("dribbling")[0].innerText = "dribbling"
      document.getElementsByClassName("defending")[0].innerText = "defending"
      document.getElementsByClassName("physical")[0].innerText = "physical"
    }
  
  }

  function clearInput() {
    Name.value = '';
    photo.value = '';
    position.value = '';
    club.value = '';
    rating.value = '';
    pace.value = '';
    shooting.value = '';
    passing.value = '';
    dribbling.value = '';
    Defending.value = '';
    Physical.value = '';
}

function showAlert(message) {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alertBox.classList.remove("hidden", "fade-out");
    alertBox.classList.add("fade-in");

    setTimeout(() => {
        alertBox.classList.remove("fade-in");
        alertBox.classList.add("fade-out");

        setTimeout(() => {
            alertBox.classList.add("hidden");
        }, 500);
    }, 3000);
}

function showModal(post) {


    modal.classList.toggle("hidden");
    const storedPlayers = localStorage.getItem("players");
    let arryPlayer = JSON.parse(storedPlayers) || [];
}