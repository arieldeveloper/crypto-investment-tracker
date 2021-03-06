import axios from "axios";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (searchString, show) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let url = '/api/ticker/';
  let requirements = {
    ticker: searchString
  }

  return axios.post(url, requirements).then((response) => {
    try {
      return [create_name(response)];
    } catch {
      console.log(`Trying to make a call to the api to search for ${searchString}`);
      return [[], null];
    }
  })
  
  /**
   * 
   * This is how the string is dispayed.
   */
  function create_name(data) {
    if (show) {
    let nam = data.data.data[searchString].name;
    let tkr = searchString;
    let val = data.data.data[searchString].quote.USD.price;
    return [[String(nam + " - " + tkr + ": " + String(val))], val];
    }
    return data.data.data[searchString].quote.USD.price;
  }
}