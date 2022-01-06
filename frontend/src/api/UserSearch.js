import User from "../entities/User.ts";
import Coin from "../entities/Coin.ts";
import Hold from "../entities/Hold.ts";
import axios from "axios";
import CoinSearch from "./CoinSearch";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async () => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let nameUrl = '/api/users/info/';
  let coinUrl = '/api/portfolio/coins/';

  try {
    let name = await getName();
    console.log(name);
    let coinlist = await getCoins();
    let Holds = [];
    for (let i = 0; i < coinlist.length; i++) {
        let curCoin = coinlist[i].coin;
        console.log(curCoin)
        let curHold = await CoinSearch(curCoin);
        console.log(curHold.coin.name)
        Holds.push(curHold);
    }
    return new User(name, Holds);
  } catch {
    console.log(`Failed to make a call to the api to get data for the user logged in`);
    return false;
  }
  
  async function getName() {
    return axios.get(nameUrl).then((response) => {
        console.log(response.data);
        try {
            return response.data;
        } catch {
           return 'no one';
        }
    }
    )}

   async function getCoins() {
        return axios.get(coinUrl).then((response) => {
            console.log(response.data);
            try {
                return response.data;
            } catch {
               return [];
            }
        } 
    )
}
}