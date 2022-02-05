import Coin from "../entities/Coin.ts";
import Hold from "../entities/Hold.ts";
import axios from "axios";
import Trade from "../entities/Trade.ts";
import TickerSearch from "./TickerSearch";

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
  let data = [];
  console.log('yhyhuhuh')
  let trades = await tradeSearch();
  console.log('uhuh')
  
  let price = await TickerSearch(requirements.coin, false);
  console.log('nnuhuh')
  return [trades, price]

  async function tradeSearch() {
    return axios.post(coinUrl, requirements).then((response) => {
        try {
            data = response.data;
            let tradelist = [];
            for (let i = 0; i < data.length; i++) {
                tradelist.push(new Trade(data[i].amount_of_coins, parseInt(data[i].price)));
            }
            return tradelist;
        } catch {
           return [];
        }
    }
    )
  }

}