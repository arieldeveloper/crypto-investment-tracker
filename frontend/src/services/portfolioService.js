// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */

import { calculateBaseStats } from "./coinService";


 export function calculatePortfolioStats(holds) {

    let {sum, worth} = sumOfCoins(holds);

    let retPer = (worth - sum) / sum;
    let retVal = worth - sum;

    return {
        valueSpent: sum,
        totalWorth: worth,
        costPerCoin: average,
        returnPercentage: retPer,
        returnValue: retVal,
    }

}


function sumOfCoins(holds) {
    let sum = 0;
    let worth = 0;
    for (const hold of holds) {
        cur = calculateBaseStats(hold);
        sum += cur.totalValue;
        worth += cur.totalWorth;
    }

    return {sum, worth};
}






