// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */


 export function calculatePortfolioStats(holds) {

    let {sum, worth} = sumOfCoins(holds);

    let retPer = 100 * (worth - sum) / sum;
    let retVal = worth - sum;

    return {
        valueSpent: sum,
        totalWorth: worth,
        returnPercentage: retPer,
        returnValue: retVal,
    }

}


function sumOfCoins(holds) {
    let sum = 0;
    let worth = 0;
    for (const hold of holds) {
        sum += hold.spent;
        worth += hold.amount * hold.coin.value;
    }

    return {sum, worth};
}






