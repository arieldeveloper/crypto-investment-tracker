import axios from "axios";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (email, password) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let url = '/api/users/login';
  let requirements = {
    email: email,
    password: password,
  }

  return axios.post(url, requirements).then((response) => {
    try {
      return response.data;
    } catch {
      console.log(`Failed to make a call to the api to login user for email ${email}`);
      return 'fail';
    }
  })
  
}