// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */
import TickerSearch from "../api/TickerSearch";


 export async function newTkrs(holds) {
     let newHolds = []
    for (const hold of holds) {
        let newHold = await newTkr(hold);
        newHolds.push(newHold);
    }
    return newHolds;   
}


export async function newTkr(hold) {
    let nam = hold.coin.name;
    let worth = await TickerSearch(nam, false);
    hold.coin.changeValue(worth);
    hold.setData(hold.amount, hold.spent);
    return hold;
    
}






