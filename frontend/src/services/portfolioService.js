// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */


 export function calculatePortfolioStats(holds) {

    console.log("XXXXXXXXXXXXXXXx")
    console.log(holds)
    let {sum, worth} = sumOfCoins(holds);
    console.log(sum, worth);

    let retPer = (worth - sum) / sum;
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
        sum += hold.data.valueSpent;
        worth += hold.data.totalWorth;
    }

    return {sum, worth};
}






