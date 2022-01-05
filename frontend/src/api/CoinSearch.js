import Coin from "../entities/Coin.ts";
import Hold from "../entities/Hold.ts";
import axios from "axios";
import Trade from "../entities/Trade.ts";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (coin) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let coinUrl = '/api/portfolio/coin/';
  let requirements = {
      coin: coin
  }
  
    return axios.post(coinUrl, requirements).then((response) => {
        try {
            let data = response.data;
            let trades = [];
            for (let i = 0; i < data.length; i++) {
                trades.push(new Trade(data[i].amount_of_coins, data[i].price));
            }
            let coino = new Coin(data[0].coin);
            let holdo = new Hold(coino, trades);
            holdo.select();
            return holdo;
        } catch {
           return [];
        }
    }
    )
}