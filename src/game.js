//card and hand Managment

export const createHand = (camp) =>{

    if(!camp){
        return false;
    }
    const hand = ["citizen" , "citizen" , "citizen" , "citizen" , camp];

    return hand;


}
 

//Duel Managment

export const compareCards = (playerCard , computerCard ) =>{

    if(playerCard == computerCard){
        return "tie"
    }

    if((playerCard === "emperor" && computerCard === "citizen") || (playerCard === "citezen" && computerCard === "slave")||(playerCard === "slave" && computerCard === "emperor")){
        return "player"
    }

    return "computer"

}

export const removeCards = (hand , card) =>{

    const index = hand.indexOf(card);

    if(index === -1){
        return false
    }

    hand.splice(index,1);

    return hand;

}

export const choseComputerCard = (hand)=>{

    if(hand.length === 0){
        return null;
    }

    const randomIndex = Math.floor(Math.random() * hand.length);

    return hand[randomIndex];


}

export const getPlayerCamp = (round) =>{
    if(round >= 1 && round <= 3){
        return "emperor"
    }

    if(round >= 4 && round <= 6){
        return "slave"
    }

    if(round >= 7 && round <= 9){
        return "emperor"
    }

    if(round >= 10 && round <= 12){
        return "slave"
    }

    return null;
}

export const createGame = (playerId) =>{

    if(!playerId){
        return null
    }

    const game = {
    playerId,
    round: 1,
    duel: 0,
    playerCamp: null,
    computerCamp: null,
    playerHand: [],
    computerHand: [],
    playerScore: 0,
    computerScore: 0,
    roundWinner: null,
    status: "playing"
  };

  return game;
    
}

export const startRound = (game) =>{
    const playerCamp = getPlayerCamp(game.round);

    let computerCamp;

    if(playerCamp === "emperor"){
        computerCamp = "slave"
    }
    else{
        computerCamp = "emperor"
    }

    game.playerCamp = playerCamp;
    game.computerCamp = computerCamp;
    game.playerHand = createHand(playerCamp);
    game.computerHand = createHand(computerCamp);
    
    game.duel = 0;
    game.roundWinner = null;

    return game;

}