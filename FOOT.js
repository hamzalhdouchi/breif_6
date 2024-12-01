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


function showModal(post) {


    modal.classList.toggle("hidden");
    const storedPlayers = localStorage.getItem("players");
    let arryPlayer = JSON.parse(storedPlayers) || [];
    let feltredArry = arryPlayer.filter(player => player.position == post);
    cardsContainer.innerHTML = '';

    if (post == 'GK' || post == 'RB' || post == 'CBR' || post == 'CBL' || post == 'LB' || post == 'CM' || post == 'CMD' || post == 'CM2' || post == 'RW' || post == 'ST' || post == 'LW') {
        feltredArry.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('bg-[url(\'/img/card.png\')]', 'bg-cover', 'bg-center', 'min-w-[120px]', 'h-[20vh]', 'h-20', 'rounded-xl', 'shadow-xl', 'flex', 'flex-col', 'justify-around');

            playerCard.innerHTML = `<div class="text-center mt-">
            <span class="block font-extrabold text-white mt-2 text-[10px]">${player.rating}</span>
            <h3 class="text-white font-bold text-[10px] mt-1">${player.name}</h3>
            <p class=" text-gray-300 font-medium text-[8px]">${player.club}</p>
        </div>
        <div class=">
         </div>
        </div>
                    <div class="absolute w-28 h-36 z-30 text-white flex justify-center items-center w-full flex justify-center">
                    <button onclick="AjouterPlayer('${player.name}', '${player.position}','${post}')" class="w-full h-full flex justify-center"> <img class="h-[8vh] rounded-b-full pb-1" src="${player.photo}" alt=""></button>
                    </div>
        <div class=" from-transparent  rounded-b-xl text-white flex justify-center">
            <div class="flex gap-2 justify-around font-semibold w-28 h-10 text-[7px] mb-10">
            <div class="text-left">
                <p> ${player.pace}PAC</p>
                <p> ${player.shooting}SHO</p>
                <p> ${player.passing}PAC</p>
            </div>
            <div class="text-right">
                <p> ${player.dribbling}DRI</p>
                <p> ${player.defending}DEF</p>
                <p> ${player.physical}PHY</p>
            </div>
            </div>
        </div>
        </div> 
                    `;
            if (post === "GK") {
                playerCard.innerHTML = `
                            <div class="text-center mt-">
                                <span class="block font-extrabold text-white mt-2 text-[10px]">${player.rating}</span>
                                <h3 class="text-white font-bold text-[10px] mt-1">${player.name}</h3>
                                <p class=" text-gray-300 font-medium text-[8px]">${player.club}</p>
                            </div>
                            <div class="w-full flex justify-center">
                                <img class="h-[8vh] rounded-b-full pb-1" src="${player.photo}" alt="">
                            </div>
                            <div class="absolute w-28 h-36 z-30 text-white flex justify-center items-center">
                            <button onclick="AjouterPlayer('${player.name}', '${player.position}','${post}')" class="w-full h-full"></button>
                            </div>
                            <div class=" from-transparent  rounded-b-xl text-white flex justify-center">
                                <div class="flex gap-2 justify-around font-semibold w-20 h-10 text-[8px] mb-10">
                                <div class="text-left">
                                    <p> ${player.diving}DIV</p>
                                    <p> ${player.handling}HND</p>
                                    <p> ${player.kicking}KCK</p>
                                </div>
                                <div class="text-right">
                                    <p> ${player.reflexes}RFX</p>
                                    <p> ${player.speed}SPD</p>
                                    <p> ${player.positioning}POS</p>
                                </div>
                                </div>
                            </div>
                            </div>
                                        `;

            }
            cardsContainer.appendChild(playerCard);
        });
    } else {
        arryPlayer.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('bg-[url(\'/img/card.png\')]', 'bg-cover', 'bg-center', 'min-w-[7vw]', 'h-[20vh]', 'rounded-xl', 'shadow-xl', 'flex', 'flex-col', 'justify-around');

            playerCard.innerHTML = `
                <div class="text-center mt-">
                    <span class="block font-extrabold text-white mt-2 text-[10px]">${player.rating}</span>
                    <h3 class="text-white font-bold text-[10px] mt-1">${player.name}</h3>
                    <p class=" text-gray-300 font-medium text-[8px]">${player.club}</p>
                </div>
        
                </div>
                            <div class=" w-28 h-[7vh] z-30 text-white flex justify-center items-center">
                            <button onclick="AjouterPlayer('${player.name}', '${player.position}R','${post}')" class="h-full w-[7vw] w-full flex justify-center"><img class="h-[7vh] rounded-b-full pb-1" src="${player.photo}" alt=""></button>
                            </div>
                <div class=" from-transparent  rounded-b-xl text-white flex justify-center">
                    <div class="flex gap-2 justify-around font-semibold w-28 h-10 text-[9px] mb-10">
                    <div class="text-left">
                        <p> ${player.pace}PAC</p>
                        <p> ${player.shooting}SHO</p>
                        <p> ${player.passing}PAC</p>
                    </div>
                    <div class="text-right">
                        <p> ${player.dribbling}DRI</p>
                        <p> ${player.defending}DEF</p>
                        <p> ${player.physical}PHY</p>
                    </div>
                    </div>
                </div>
                </div>
                            `;
            if (post === "GK") {
                playerCard.innerHTML = `
                                    <div class="text-center mt-">
                                        <span class="block font-extrabold text-white mt-2 text-[10px]">${player.rating}</span>
                                        <h3 class="text-white font-bold text-[10px] mt-1">${player.name}</h3>
                                        <p class=" text-gray-300 font-medium text-[8px]">${player.club}</p>
                                    </div>
                                    <div class="w-full flex justify-center">
                                        <img class="h-[8vh] rounded-b-full pb-1" src="${player.photo}" alt="">
                                    </div>
                                    <div class="absolute w-28 h-36 z-30 text-white flex justify-center items-center">
                                    <button onclick="AjouterPlayer('${player.name}', '${player.position}','${post}')" class="w-full h-full"></button>
                                    </div>
                                    <div class=" from-transparent  rounded-b-xl text-white flex justify-center">
                                        <div class="flex gap-2 justify-around font-semibold w-20 h-10 text-[8px] mb-10">
                                        <div class="text-left">
                                            <p> ${player.diving}DIV</p>
                                            <p> ${player.handling}HND</p>
                                            <p> ${player.kicking}KCK</p>
                                        </div>
                                        <div class="text-right">
                                            <p> ${player.reflexes}RFX</p>
                                            <p> ${player.speed}SPD</p>
                                            <p> ${player.positioning}POS</p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                  
                                                `;

            }
            cardsContainer.appendChild(playerCard);

        });
    }
}   

function AjouterPlayer(playerName, selected, post) {


    console.log("test :", playerName, selected, post);
    const cardElement = document.getElementById(selected);



    const storedPlayers = localStorage.getItem("players");
    let arryPlayer = JSON.parse(storedPlayers) || [];
    const player = arryPlayer.find(player => player.name === playerName);
    if (!player) {

        console.error('Player not found');
        return;
    }
    if (cardElement) {
        cardElement.innerHTML = `
              <div class="flex flex-col items-center gap-1">
    <div class="relative bg-[url('/img/card.png')] bg-cover bg-center lg:w-[7vw] lg:h-[20vh] md:w-20 md:h-28 h-20 w-16 rounded-xl shadow-xl flex flex-col justify-around group">
      <div class="text-center mt-">
        <span class="block font-extrabold text-white mt-2 lg:text-[10px] md:text-[8px] text-[6px]">${player.rating}</span>
        <h3 class="text-white font-bold md:text-[10px] text-[6px]  mt-1">${player.name}</h3>
        <p class="text-gray-300 font-medium md:text-[8px] text-[5px] ">${player.club}</p>
      </div>
      <div class="w-full flex justify-center">
        <img class=" lg:h-[8vh] h-[3vh] rounded-b-full pb-1" src="${player.photo}" alt="">
      </div>
        <div id="btn" class="absolute lg:w-[7vw] lg:h-[17vh] md:w-18 md:h-24 h-20 w-16 rounded-3xl bg-opacity-90 bg-black z-50 text-white flex justify-center items-center flex-col justify-around  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
        <button onclick="showModal('${post}')" class="border-[1px] rounded-xl border-white border-solid lg:w-10 lg:h-8 md:h-9 md:w-7 w-5 h-4">
          <i class="fa-solid fa-rotate lg:w-10 lg:h-8 md:h-9 md:w-7 w-5 h-4"></i>
        </button>
        <button onclick="RemplacePlayer('${post}','${player.name}')" class="border-[1px] rounded-xl border-white border-solid  lg:w-10 lg:h-8 md:h-9 md:w-7 w-5 h-4">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button onclick="suprim('${player.name}','${post}')" class="border-[1px] rounded-xl border-white border-solid  lg:w-10 lg:h-8 md:h-9 md:w-7 w-5 h-4">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
       <div class="from-transparent rounded-b-xl text-white flex justify-center">
        <div class="flex gap-2 justify-around font-semibold w-20 h-10 lg:text-[7px] hover:text-[7px] text-[4px] mb-10">
          <div class="text-left">
            <p id="pace">${player.pace}PAC</p>
            <p>${player.shooting}SHO</p>
            <p>${player.passing}PAC</p>
          </div>
          <div class="text-right">
            <p>${player.dribbling}DRI</p>
            <p>${player.defending}DEF</p>
            <p>${player.physical}PHY</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
                `;
                if (post === "GK") {
                    cardElement.innerHTML = `
                          <div class="flex flex-col items-center gap-1">
            <div class="relative bg-[url('/img/card.png')] bg-cover bg-center lg:w-[7vw] lg:h-[20vh] md:w-20 md:h-28 h-20 w-16 rounded-xl shadow-xl flex flex-col justify-around group">
              <div class="text-center mt-">
                <span class="block font-extrabold text-white mt-2 lg:text-[10px] md:text-[8px] text-[6px]">${player.rating}</span>
                <h3 class="text-white font-bold md:text-[10px] text-[6px] mt-1">${player.name}</h3>
                <p class="text-gray-300 font-medium md:text-[8px] text-[5px]">${player.club}</p>
              </div>

               <div class="w-full flex justify-center">
        <img class="lg:h-[8vh] h-[3vh] rounded-b-full pb-1" src="${player.photo}" alt="">
      </div>
      <div id="btn" class="absolute w-[7vw] rounded-3xl h-[18vh] bg-opacity-90 bg-black z-50 text-white flex justify-center items-center flex-col justify-around  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
        <button onclick="showModal('${post}')" class="border-[1px] rounded-xl border-white border-solid w-10 h-8">
          <i class="fa-solid fa-rotate"></i>
        </button>
        <button onclick="suprim('${player.name}','${post}')" class="border-[1px] rounded-xl border-white border-solid w-10 h-8">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
        <div class="from-transparent rounded-b-xl text-white flex justify-center">
        <div class="flex gap-2 justify-around font-semibold w-20 h-10 lg:text-[7px] hover:text-[7px] text-[4px] mb-10">
          <div class="text-left">
            <p> ${player.diving}DIV</p>
            <p> ${player.handling}HND</p>
            <p> ${player.kicking}KCK</p>
        </div>
        <div class="text-right">
            <p> ${player.reflexes}RFX</p>
            <p> ${player.speed}SPD</p>
            <p> ${player.positioning}POS</p>
        </div>
        </div>
      </div>
    </div>
  </div>
  
                        `;
                    }
                }
            
                modal.classList.toggle("hidden");
            
            
            }

            function showModalPlayer() {
                modalPlayer.classList.toggle("hidden");
            }
            function suprim(playerName, post) {
                let posistion = document.getElementById(post);
                posistion.innerHTML = `
                <div
                class="bg-[url('/img/card.png')] bg-cover bg-center w-[7vw] h-[20vh] rounded-xl shadow-xl flex flex-col justify-around">
                <button onclick="showModal('${post}')" class="w-full text-white font-bold h-full text-[3vh]">
                  +
                </button>
              </div>
              <div
                class="bg-black w-10 h-5 text-white flex justify-center items-center font-bold bg-opacity-80 rounded-3xl"
                value="${post}">
                ${post}
              </div>`;
                const data = localStorage.getItem("players");
                let arrayData = [];
                if (data) {
                    arrayData = JSON.parse(data);
                }
            
            
                arrayData = arrayData.filter(players => players.name !== playerName);
                console.log(arrayData);
                localStorage.setItem("players", JSON.stringify(arrayData));
            
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
                }, 3000)
            };

            function RemplacePlayer(post, playerName) {


                PlayerPost = post.slice(0, -1);
            
                //player list str
                let element = document.getElementById(post);
                //player match st
                let element2 = document.getElementById(PlayerPost);
                let playerName2Text = document.getElementById(PlayerPost).querySelector('h3').textContent;
            
            
                console.log("player post :", PlayerPost);
                console.log("post  :", post);
            
                element.setAttribute("id", PlayerPost);
                element2.setAttribute("id", post);
                AjouterPlayer(playerName, post, post);

                AjouterPlayer(playerName2Text, PlayerPost, PlayerPost);
            
            }