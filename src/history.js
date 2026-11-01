import {getData , saveData} from "./storage.js"

const key = "ecard_history";

export const getHistory = () =>{
    return getData(key) || [];
}

export const saveMatch = (gameRessult)=>{
    if(!gameRessult){
        return null;
    }

    const history = getHistory();

    const newMatch = {
        id : `g_${Date.now()}`,
        player : gameRessult.playerId,
        date : Date.now().toString(),
        playerScore : gameRessult.playerScore,
        computerScore : gameRessult.computerScore,
        result : gameRessult.result
    }

    history.push(newMatch);

    saveData(key, history);

    return newMatch;
}

export const deleteMatch = (id) =>{
    const history = getHistory();

    const match = history.find(item => item.id === id);

    if(!match){
        return false;
    }

    const updatedHistory = history.filter(item => item.id !== id);

    saveData(key , updatedHistory);

    return true;
}