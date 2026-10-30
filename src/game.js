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