import { getPlayers } from "./players.js";
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
        playerId : gameRessult.playerId,
        date: new Date().toISOString(),
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

export const getFilteredHistory = (nickname = "" , result = "all" , dateFilter = "all") =>{

    const history = getHistory();
    const players = getPlayers();


    const FiltredHistory = history.filter(match => {

        const player = players.find((player)=> player.id === match.playerId);

        const playerName = player ? player.nickname : "Deleted Player";

        const matchesName = playerName.toLowerCase().includes(nickname.trim().toLowerCase());

        const matchesResult = result === "all" || match.result === result;

        const matchDate = new Date(match.date);

        const now = new Date();

        let isInSelectedDteRange = true;

        if(dateFilter === "today"){
            isInSelectedDteRange = matchDate.toDateString() === now.toDateString();
        }

        if(dateFilter === "week"){
            const sevenDayAgo = new Date();
            sevenDayAgo.setDate(now.getDate() - 7);

            isInSelectedDteRange = matchDate >= sevenDayAgo && matchDate <= Date.now();
        }

        return isInSelectedDteRange && matchesResult && matchesName;
    })

    return FiltredHistory.sort((a,b) => new Date(b.date) - new Date(a.date));


}