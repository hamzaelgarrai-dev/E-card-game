//card and hand Managment

export const createHand = (camp) =>{

    if(!camp){
        return false;
    }
    const hand = ["citizen" , "citizen" , "citizen" , "citizen" , camp];

    return hand;


}

export const removeCards = (hand , card) =>{

    const newHand = [...hand];
    const index = newHand.indexOf(card);

    if(index === -1){
        return newHand
    }

    newHand.splice(index,1);

    return newHand;

}
 
export const chooseComputerCard = (hand)=>{

    if(hand.length === 0){
        return null;
    }

    const randomIndex = Math.floor(Math.random() * hand.length);

    return hand[randomIndex];


}

//Duel Managment

export const duel = (playerCard , computerCard ) =>{

    if(playerCard === computerCard){
        return "tie"
    }

    if((playerCard === "emperor" && computerCard === "citizen") || (playerCard === "citizen" && computerCard === "slave")||(playerCard === "slave" && computerCard === "emperor")){
        return "win"
    }

    return "loss"

}

export const playDuel = (game, playerCard) =>{

    if(game.status !== "playing" || game.roundWinner !== null ){
        return null
    }
    if(!game.playerHand.includes(playerCard)){
        return null;
    }

    const computerCard = chooseComputerCard(game.computerHand);

    if(computerCard === null){
        return null;
    }

    const firstPlayer = getFirstPlayer(game);
    const result = duel(playerCard, computerCard);

    game.playerHand = removeCards(game.playerHand , playerCard);
    game.computerHand = removeCards(game.computerHand, computerCard);

    game.duelCount ++;

    if (game.firstCamp === "emperor") {
        game.firstCamp = "slave";
    } 
    else {
         game.firstCamp = "emperor";
    }

    if(result !== "tie"){
        if (result === "win") {
      finishRound(game, "player");
    } else {
      finishRound(game, "computer");
    }

        if(isGameFinished(game)){
            game.status = "finished";
        }
    }

    return {playerCard, computerCard, firstPlayer, result}

}







//game managment

export const createGame = (playerId) =>{

    if(!playerId){
        return null
    }

    const game = {
    playerId,
    round: 1,
    duelCount: 0,
    playerCamp: null,
    computerCamp: null,
    firstCamp: "emperor",
    playerHand: [],
    computerHand: [],
    playerScore: 0,
    computerScore: 0,
    roundWinner: null,
    status: "playing"
  };

  return game;
    
}


export const isGameFinished =(game) =>{

    if(game.round === 12 && game.roundWinner !== null){
        return true;
    }

    return false;
    
}

export const getCurrentGroup = (round) => {
  return Math.ceil(round / 3);
};

export const getGameWinner = (game) =>{
    if(!isGameFinished(game)){
        return null;
    }
    if(game.playerScore > game.computerScore){
        return "player"
    }
    if(game.playerScore < game.computerScore){
        return "computer"
    }

    return "tie";
}

// Round Managment

export const startRound = (game) =>{
    const playerCamp = getPlayerCamp(game.round);

    if (playerCamp === null) {
        return null;
    }

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
    
    game.duelCount = 0;
    game.roundWinner = null;

    return game;

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

export const getFirstPlayer = (game) => {
  if (game.firstCamp === game.playerCamp) {
    return "player";
  }

  return "computer";
};


export const calculateRoundPoints = (winnerCamp) =>{

    if(winnerCamp === "emperor"){
        return 1
    }

    if(winnerCamp === "slave"){
        return 5
    }

    return 0;

}

export const finishRound =(game , winner)=>{

    if (winner !== "player" && winner !== "computer") {
      return false;
    }

    if (game.roundWinner !== null) {
      return false;
    }

    if (winner === "player") {

        const points = calculateRoundPoints(game.playerCamp)

        game.playerScore += points;
    }
    else{
        const points = calculateRoundPoints(game.computerCamp);

        game.computerScore += points;
    }

    game.roundWinner = winner;

    return true;

}

export const nextRound = (game) =>{
    if(game.roundWinner === null){
        return false
    }

    if(game.round >= 12){
        return false;
    }

    game.round ++;

    startRound(game);

    return true;
}

//game result managment

export const getGameResult = (game)=>{

    if(!isGameFinished(game)){
        return null ;
    }

    const winner = getGameWinner(game);

    let result;

    if(winner === "player"){
        result = "win";
    }
    else if(winner === "computer"){
        result = "loss";
    }
    else{
        result = "tie";
    }

    return {
        playerId : game.playerId,
        playerScore : game.playerScore,
        computerScore : game.computerScore,
        result : result
    }

}