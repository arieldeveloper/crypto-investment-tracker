import axios from "axios";
import LoginPost from "./LoginPost.js"

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (name, email, password, password2) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let url = '/api/users/register';
  let requirements = {
    name: name,
    email: email,
    password: password,
    password2: password2
  }

  return axios.post(url, requirements).then((response) => {
    try {
      console.log(response);
      return error_check(response);
    } catch {
      console.log(`Trying to make a call to the api to create user for email ${email}`);
      return [];
    }
  })
  
  /**
   * 
   * This is how the string is dispayed.
   */
  async function call_Login() {
    let res = await LoginPost(email, password);
    return res;
  }

  async function error_check(data) {
    if (typeof data.data[0].message !== "undefined") {
      return data.data[0].message;
    }
    else {
      return await call_Login();
    }
  }
}