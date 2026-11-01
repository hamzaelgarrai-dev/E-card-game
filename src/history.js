import {getData , saveData} from "./storage.js"

const key = "ecard_history";

export const getHistory = () =>{
    return getData(key) || [];
}