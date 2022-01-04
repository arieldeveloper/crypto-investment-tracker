import axios from "axios";

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
    password, password,
    password2: password2
  }

  return axios.post(url, requirements).then((response) => {
    console.log(response)
    try {
      return [create_name(response)];
    } catch {
      console.log(`Trying to make a call to the api to create user for email ${email}`)
      return [];
    }
  })
  
  /**
   * 
   * This is how the string is dispayed.
   */
  function create_name(data) {
    console.log('yeet');
    console.log(data.data[0]);
    let nam = data.data[0].name;
    let em = data.data[0].email;
    let pas = data.data[0].password;
    return String(nam + " " + em + " " + pas);
  }
}