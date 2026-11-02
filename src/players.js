import { getData , saveData, removeData } from "./storage.js"

const key = "ecard_players";
const selectedPlayerKey = "ecard_selected_player";

export const getPlayers = () =>{

    return getData(key) || []


}
export const getPlayerById = (id) =>{
    const players = getPlayers();

    return players.find((player) => player.id === id) || null;
}

// export const checkExistNickname = (name , excludeId = null)=>{

//     const players = getPlayers();

//      const found = players.find((player) => player.nickname.toLowerCase() === name.toLowerCase() && player.id !== excludeId)

//      return found !== undefined



// }
// export const validateName = ()=>{

// }

export const validateNickName = (name , excludeId = null )=>{
    if (typeof name !== "string") {
     return false;
    }

    const nickname = name.trim();
    const regex = /^[A-Za-z0-9]{3,15}$/

    if(!regex.test(nickname)){
        return false;
    }

    const players = getPlayers();

     const found = players.find(player =>
    player.nickname.toLowerCase() === nickname.toLowerCase() && player.id !== excludeId)

     if(found){
        return false;
     }

     return true;


}

export const createPlayer = (name , profilePicture) =>{

    
    if(!validateNickName(name)){
        
        // alert("name already exist chose another one");
        console.error("alredy exist")
        return null
        
    }
    const players = getPlayers();
    
    const newPlayer = {
                id :`p_${Date.now()}`,
                nickname : name.trim(),
                avatar : profilePicture,
                gamesPlayedCount : 0,
                createdAt : Date.now().toString()
            }

            players.push(newPlayer);

            saveData(key , players);
            return newPlayer;
}

export const updatePlayer = (id, newName , newAvatar) =>{

    const players = getPlayers();
    const player = players.find(player => player.id === id);

    if(!player){
        return null;
    }

    if(!validateNickName(newName , id)){
        return null;
    }

    player.nickname = newName.trim();
    player.avatar = newAvatar;

    saveData(key , players);

    return player;

}

export const deletePlayer = (id) =>{

    const players = getPlayers();

    const playerToDelete = getPlayerById(id);

    if(!playerToDelete){
        return false
    }

    const updatedPlayers = players.filter((player)=> player.id !== id)

    saveData(key , updatedPlayers);

    if (getData(selectedPlayerKey) === id) {
    removeData(selectedPlayerKey);
  }

    return true;



}


export const incrementGamesPlayed = (id) =>{

    const players = getPlayers();

    const player = players.find(player => player.id === id);

    if (!player) {
     return false;
    }

    player.gamesPlayedCount++;

    saveData(key, players);

    return true;



}


export const selectPlayer =(id)=>{

    const player = getPlayerById(id);

    if(!player){
        return false;
    }

    saveData(selectedPlayerKey , id);

    return true;
}

export const getSelectedPlayer =()=>{

    const selectedPlayerId = getData(selectedPlayerKey)

    if(!selectedPlayerId){
        return null;
    }


    return getPlayerById(selectedPlayerId);

}

