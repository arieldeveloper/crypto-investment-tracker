// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */

export function calculateBaseStats(hold) {

    console.log(hold)
    let spent = parseFloat(hold.spent);
    let amount = parseFloat(hold.amount)
    let average = spent / amount;
    let totalWorth = amount * hold.coin.value;
    let retVal = totalWorth - spent;
    let retPer = 100 * retVal / spent;
    let retCoin = retVal / amount;

    let data = {
        costPerCoin: average,
        totalWorth: totalWorth,
        returnPercentage: retPer,
        returnValue: retVal,
        returnPerCoin: retCoin
    }

    return data

}






