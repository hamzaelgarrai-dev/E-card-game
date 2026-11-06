// import { getPlayers, createPlayer , validateNickName } from "./players.js";

// console.log("test 1 :" ,createPlayer("Hamza" ,"avatar1.png"))
// console.log("test 2 :" ,createPlayer("hamza" ,"avatar2.png"))
// console.log("test 3 :" ,createPlayer("mouhssine" ,"avatar3.png"))
// console.log("test 4 :" ,validateNickName("HAMZA"))

// console.log("test 5 : ", getPlayers())

import { showHeaderPlayer, showHistory, showPlayers, showView } from "./ui.js";
import { getSelectedPlayer , selectPlayer , deletePlayer ,getPlayerById, updatePlayer,validateNickName , createPlayer} from "./players.js";
import { deleteMatch } from "./history.js";


// controling the view (navigation);

document.getElementById("homeRef").addEventListener("click" , ()=>{
  showView("instructionView");
  
})

document.getElementById("gotoProfileView").addEventListener("click", ()=>{

    showView("playersView");
    
    

})

document.getElementById("gotoGameBoardView").addEventListener("click" , ()=>{
    const registed = getSelectedPlayer()
    
    if(registed){

        showView("gameView");
    }
    else{
        showView("playersView")
    }
})

document.getElementById("gotoHistory").addEventListener("click" , ()=>{
    showView("gameHistoryView");
    showHistory();
   
})


//selected player handling 

const handlePlayerSelection = () => {
  const container = document.querySelector(".profileContainer");

  container.addEventListener("click", (event) => {
    const selectButton = event.target.closest(".select-btn");

    if (!selectButton) return;

    const profileCard = selectButton.closest("[data-id]");

    if (!profileCard) return;

    const playerId = profileCard.dataset.id;

    selectPlayer(playerId);
    showHeaderPlayer();

    showPlayers();
  });

};


// delete player handling 

const handlePlayerDeletion = () => {
  const container = document.querySelector(".profileContainer");

  container.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-btn");

    if (!deleteButton) return;

    const profileCard = deleteButton.closest("[data-id]");
    if (!profileCard) return;

    const playerId = profileCard.dataset.id;

    const confirmed = confirm("Are you sure you want to delete this player?");

    if (!confirmed) return;

    deletePlayer(playerId);
    showPlayers();
    showHeaderPlayer();
  });
};




// handling updating player 

const dialog = document.querySelector("#editPlayerDialog");
const editForm = document.querySelector("#editPlayerForm");
const editNickname = document.querySelector("#editNickname");
const avatarOptions = document.querySelector("#editAvatarOptions");

let editingPlayerId = null;
let selectedAvatar = null;

document.querySelector(".profileContainer").addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit-btn");

  if (!editButton) return;

  const card = editButton.closest("[data-id]");
  editingPlayerId = card.dataset.id;

  const player = getPlayerById(editingPlayerId);

  editNickname.value = player.nickname;
  selectedAvatar = player.avatar;

  document.querySelectorAll(".edit-avatar").forEach((button) => {
    const avatarPath = `assets/Avatars/${button.dataset.avatar}.svg`;

    button.classList.toggle("border-blood", avatarPath === selectedAvatar);
    button.classList.toggle("border-ink", avatarPath !== selectedAvatar);
  });

  dialog.showModal();
});

avatarOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".edit-avatar");

  if (!button) return;

  selectedAvatar = `assets/Avatars/${button.dataset.avatar}.svg`;

  document.querySelectorAll(".edit-avatar").forEach((option) => {
    option.classList.toggle("border-blood", option === button);
    option.classList.toggle("border-ink", option !== button);
  });
});


const editError = document.querySelector("#editError");

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nickname = editNickname.value.trim();

  if (!validateNickName(nickname, editingPlayerId)) {
    editError.textContent = "Invalid or already taken nickname.";
    return;
  }

  const updatedPlayer = updatePlayer(
    editingPlayerId,
    nickname,
    selectedAvatar
  );

  if (!updatedPlayer) {
    editError.textContent = "Could not update player.";
    return;
  }

  dialog.close();
  showPlayers();
  showHeaderPlayer();
});

document.querySelector("#cancelEdit").addEventListener("click", () => {
  dialog.close();
});


// handlinig creating a player 

const playerForm = document.querySelector("#playerForm");
const nicknameInput = document.querySelector("#nickname");
const nicknameError = document.querySelector("#nicknameError");
const avatarchoices = document.querySelector("#avatarOptions");

let AvatarChoise = "assets/Avatars/dragon.svg";

avatarchoices.addEventListener("click", (event) => {
  const option = event.target.closest(".avatar-option");

  if (!option) return;

  AvatarChoise = option.querySelector("img").getAttribute("src");

  document.querySelectorAll(".avatar-option").forEach((avatar) => {
    avatar.classList.toggle("border-blood", avatar === option);
    avatar.classList.toggle("border-transparent", avatar !== option);
  });
});

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nickname = nicknameInput.value.trim();

  const newPlayer = createPlayer(nickname, AvatarChoise);

  if (!newPlayer) {
    nicknameError.textContent = "Invalid or already existing nickname.";
    return;
  }

  nicknameError.textContent = "";

  showPlayers();

  playerForm.reset();

  AvatarChoise = "assets/Avatars/dragon.svg";

  document.querySelectorAll(".avatar-option").forEach((avatar, index) => {
    avatar.classList.toggle("border-blood", index === 0);
    avatar.classList.toggle("border-transparent", index !== 0);
  });
});


//handling game History search

const searchInput = document.querySelector("#searchInput");
const resultFilters = document.querySelector("#resultFilters");
let selectedResult = "all";
let selectedDate = "all";



//filter by game result win/loos ...

resultFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-result]");

    if (!button) return;

    selectedResult = button.dataset.result;

    showHistory(searchInput.value, selectedResult , selectedDate);
});

//filter by date 

const dateFilters = document.querySelector("#dateFilters");

dateFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-date]");

    if (!button) return;

    selectedDate = button.dataset.date;

    showHistory(searchInput.value, selectedResult, selectedDate);
});

//filter by input 
searchInput.addEventListener("input" , ()=>{
  showHistory(searchInput.value , selectedResult, selectedDate);
})

// handling game history deletion

const gamesList = document.querySelector("#gamesList");
const deleteGameDialog = document.querySelector("#deleteGameDialog");

let selectedGameId = null;

gamesList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-game-btn");

    if (!deleteButton) return;

    selectedGameId = deleteButton.dataset.gameId;

    deleteGameDialog.showModal();
});

// handling game history deletion confirmation

const confirmDeleteGame = document.querySelector("#confirmDeleteGame");

confirmDeleteGame.addEventListener("click", () => {
    if (!selectedGameId) return;

    deleteMatch(selectedGameId);

    selectedGameId = null;

    deleteGameDialog.close();

    showHistory(searchInput.value, selectedResult, selectedDate);
});

// handling game history deletion cancelation

const cancelDeleteGame = document.querySelector("#cancelDeleteGame");

cancelDeleteGame.addEventListener("click", () => {
    selectedGameId = null;
    deleteGameDialog.close();
});

const main = () =>{

    showView("instructionView");
    showPlayers();
    handlePlayerSelection();
    handlePlayerDeletion();
    showHeaderPlayer();
    // showHistory();
}


main();