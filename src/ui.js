import { getPlayers , getSelectedPlayer , } from "./players.js";
import { getFilteredHistory } from "./history.js";

// Showing selected Profile in header
export const showHeaderPlayer = () => {
  const player = getSelectedPlayer();
  const label = document.getElementById("headerPlayer");

  label.textContent = player ? "PROFILE: " + player.nickname : "NO PLAYER SELECTED";
};

// Navigation
export const showView = (ViewID) =>{
    const views = document.querySelectorAll("main section");

    views.forEach((view)=>{
        view.classList.add("hidden");
    })

    const selectedView = document.getElementById(ViewID);

    if(selectedView){

        selectedView.classList.remove("hidden");
    }
}

// Showing Players
export const showPlayers = () =>{
    const players = getPlayers();

    const container = document.querySelector(".profileContainer");

    container.innerHTML = "";

    const selectedPlayer = getSelectedPlayer();

    players.forEach((player) =>{
        const profileCard = document.createElement("div");

        const isSelected = selectedPlayer?.id === player.id;

        profileCard.className = `
             w-[90%] h-20 bg-paper flex items-center justify-between px-3
             ${isSelected ? "border-l-8 border-gold" : "border-l-8 border-transparent"}
            `;
       
        profileCard.dataset.id = player.id;
        
        profileCard.innerHTML += `
          <div class="flex  items-center ">
            <div class="avatar">

              <img src="${player.avatar}" alt="snake" class="h-16 w-full object-cover mr-4">

            </div>
            <div class="player-detaills flex flex-col  p-2">
              <P class="font-mincho text-[24px] leading-[38px]">${player.nickname}</P>
              <P class="font-plex text-[11px] font-medium tracking-wider">GAMES PLAYED: ${player.gamesPlayedCount}</P>

            </div>
          </div>

          <div class="options flex w-64  justify-between font-plex">

          <button class="select-btn font-plex text-xs tracking-wider ${isSelected ? "text-blood" : "hover:text-blood"}">${isSelected ? "SELECTED" : "SELECT"}</button>
          <button class="edit-btn font-plex text-xs tracking-wider hover:text-blood">EDIT</button>
          <button class="delete-btn font-plex text-xs tracking-wider hover:text-blood">DELETE</button>


          </div>`;

          container.appendChild(profileCard)

        
        
    })
}


//showing history

export const showHistory = (nickname = "" , result = "all", dateFilter = "all") =>{
  const history = getFilteredHistory(nickname , result, dateFilter);
  const players = getPlayers();

  const gameList = document.querySelector("#gamesList");
  const emptyMessage = document.querySelector("#emptyMessage");

  gameList.innerHTML = "";

  if(history.length === 0){
    emptyMessage.classList.remove("hidden");
    return;

  }

  emptyMessage.classList.add("hidden");

  history.forEach((match)=>{

    const player = players.find((p)=>p.id === match.playerId);

    const playerName = player ? player.nickname : "Deleted Player";

    const gameDate = new Date(match.date).toLocaleString();

    const gameRow = document.createElement("div");

    gameRow.className = "flex item-center justify-between border-b border-ink/20 p-4";

    gameRow.innerHTML = `<div>
                <p class="font-mincho text-lg">${playerName}</p>
                <p class="font-plex text-xs">${gameDate}</p>
            </div>

            <div class="font-plex text-sm">
                <p>${match.playerScore} - ${match.computerScore}</p>
                <p class="uppercase">${match.result}</p>
            </div>

            <button
                class="delete-game-btn text-blood text-xs"
                data-game-id="${match.id}"
            >
                DELETE
            </button>`

            gameList.appendChild(gameRow);

  })
}