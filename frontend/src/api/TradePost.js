import axios from "axios";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (coin, amount, price) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let url = '/api/portfolio/trade';
  let requirements = {
    coin: coin,
    amount: amount,
    price: price
  }

  return axios.post(url, requirements).then((response) => {
    try {
      return response.data;
    } catch {
      console.log(`Failed to make a  new trade for coin ${coin}`);
      return 'fail';
    }
  })
  
}