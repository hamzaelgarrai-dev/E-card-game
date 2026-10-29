import { getData , saveData, removeData } from "./storage.js"

const key = "example_key"
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

    const nickname = name.trim();
    const regex = /^[A-Za-z0-9]{3,15}$/

    if(!regex.test(nickname)){
        return false;
    }

    const players = getPlayers();

     const found = players.find((player) => player.nickname.toLowerCase() === name.toLowerCase() && player.id !== excludeId)

     if(found){
        return false;
     }

     return true;


}

export const createPlayer = (name , profilePicture) =>{

    const players = getPlayers();

    if(!validateNickName(name)){

        // alert("name already exist chose another one");
        console.error("alredy exist")
        return null
        
    }

    const newPalyer = {
                id : crypto.randomUUID(),
                nickname : name,
                avatar : profilePicture,
                gamesPlayedCount : 0,
                createdAt : Date.now()
            }

            players.push(newPalyer);

            saveData(key , players);
            return newPalyer;
}

export const updatePlayer = (id, newName , newAvatar) =>{

    const players = getPlayers();
    const player = getPlayerById(id);

    if(!player){
        return null;
    }

    if(!validateNickName(newName , id)){
        return null;
    }

    player.nickname = newName.trim();
    player.avatar = newAvatar;

    saveData(key , players);

}

export const deletePlayer = (id) =>{

    const players = getPlayers();

    const playerToDelete = getPlayerById(id);

    if(!playerToDelete){
        return false
    }

    const updatedPlayers = players.filter((player)=> player.id !== id)

    saveData(key , updatedPlayers);

    return true;



}


export const incrementGamesPlayed = (id) =>{

    const players = getPlayers();

    const playerToIncrement = getPlayerById(id);

    if(!playerToIncrement){
        return false
    }

    players.forEach(player => {
        if(player.id === playerToIncrement.id){
            player.gamesPlayedCount ++;
        }
    });

    saveData(key, players);

    return true;



}


export const selectPlayer =(id)=>{

    const player = getPlayerById(id);

    if(!player){
        return false;
    }

    saveData("selected_Player" , id);

    return true;
}

export const getSelectedPlayer =()=>{

    const selected_Player_id = localStorage.getItem("selected_player")

    if(!selected_Player_id){
        return null;
    }


    return getPlayerById(selected_Player_id);

}

