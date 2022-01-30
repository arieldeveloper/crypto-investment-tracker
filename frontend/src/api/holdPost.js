import axios from "axios";

/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (coin, amount, spent) => {
  // TODO: need to make an api call to the backend, where we will have the external api call
  
  let checkUrl = '/api/holds/coin';
  let checkRequirements = {
    coin: coin
  }

  let newUrl = '/api/holds/new_hold';
  let updateUrl = '/api/holds/update_hold';
  let fullRequirements = {
    coin: coin,
    amount: amount,
    spent: spent
  };

  return axios.post(checkUrl, checkRequirements).then((response) => {
    try {
        if (response.data == true) {
          console.log(response.data);
            return newRow();
        }
        else {
          console.log(response.data);
            return updateRow();
        }
    } catch {
      console.log(`Failed to make a call to the api to check if hold exists for ${coin}`);
      return 'nope';
    }
  })

  async function newRow() {
    return axios.post(newUrl, fullRequirements).then((response) => {
        try {
          return response;
        } catch {
          console.log(`Failed to make a call to the api to create new hold ${coin}`);
          return 'nope';
        }
      })
  }

  async function updateRow() {
    return axios.post(updateUrl, fullRequirements).then((response) => {
        try {
          return response;
        } catch {
          console.log(`Trying to make a call to the api to update a hold ${coin}`);
          return 'nope';
        }
      })
  }
  
}