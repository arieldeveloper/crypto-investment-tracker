import axios from "axios";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async () => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let url = '/api/users/logout';

  return axios.get(url).then((response) => {
    try {
      return response.data;
    } catch {
      console.log(`Failed to logout`);
      return 'fail';
    }
  })
  
}