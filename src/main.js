import { getPlayers, createPlayer , validateNickName } from "./players.js";

console.log("test 1 :" ,createPlayer("Hamza" ,"avatar1.png"))
console.log("test 2 :" ,createPlayer("hamza" ,"avatar2.png"))
console.log("test 3 :" ,createPlayer("mouhssine" ,"avatar3.png"))
console.log("test 4 :" ,validateNickName("HAMZA"))

console.log("test 5 : ", getPlayers())