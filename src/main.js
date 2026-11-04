// import { getPlayers, createPlayer , validateNickName } from "./players.js";

// console.log("test 1 :" ,createPlayer("Hamza" ,"avatar1.png"))
// console.log("test 2 :" ,createPlayer("hamza" ,"avatar2.png"))
// console.log("test 3 :" ,createPlayer("mouhssine" ,"avatar3.png"))
// console.log("test 4 :" ,validateNickName("HAMZA"))

// console.log("test 5 : ", getPlayers())

import { showPlayers, showView } from "./ui.js";
import { getSelectedPlayer , selectPlayer , deletePlayer} from "./players.js";


// controling the view 

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
    showView("")
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
  });
};


const main = () =>{

    showView("instructionView");
    showPlayers();
    handlePlayerSelection();
    handlePlayerDeletion()
}


main();