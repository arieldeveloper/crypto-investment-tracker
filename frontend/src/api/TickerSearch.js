/**
 * This function takes in a string and returns a searched coin through the backend api call
 * @param searchString representing a searched ticker symbol
 */
export default async (searchString) => {
  //TODO: need to make an api call to the backend, where we will have the external api call
  return ["empty"]
  // return fetch("").then((response) => response.json()).then((data) => {
  //   try {
  //     return [create_name(data)];
  //   } catch {
  //     console.log(`Trying to make a call to the api to search for ${searchString}`)
  //     return [];
  //   }
  // })
  //
  // function create_name(data) {
  //   let nam = data.data[searchString].name;
  //   let tkr = searchString;
  //   let val = data.data[searchString].quote.USD.price;
  //   return String(nam + " - " + tkr + ": " + String(val));
  // }
}