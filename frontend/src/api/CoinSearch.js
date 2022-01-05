import User from "../entities/User.ts";
import Coin from "../entities/Coin.ts";
import Hold from "../entities/Hold.ts";
import axios from "axios";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (coin) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let coinUrl = '/api/portfolio/trades/';
  
    return axios.post(coinUrl, coin).then((response) => {
        console.log(response.data)
        try {
            return response.data;
        } catch {
           return [];
        }
    }
    )
}