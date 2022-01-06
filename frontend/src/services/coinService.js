// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */

export function calculateBaseStats(trades, coin) {

    let worth = coin.value;

    let {average, sum, coinAmount} = sumOfTrades(trades);

    let totalWorth = worth * coinAmount;
    let retPer = (worth - average) / average;
    let retVal = retPer * sum;
    let retCoin = retPer * average

    let data = {
        valueSpent: sum,
        totalCoins: coinAmount,
        costPerCoin: average,
        totalWorth: totalWorth,
        returnPercentage: retPer,
        returnValue: retVal,
        returnPerCoin: retCoin
    }

    return data

}

function sumOfTrades(trades) {
    let sum = 0;
    let coinAmount = 0;
    for (const trade of trades) {
        sum += trade.value * trade.amount;
        coinAmount += trade.amount;
    }
    let average = sum / coinAmount;
    return {average, sum, coinAmount};
}

export function calculateGrowthPercentage(trades) {
    const first = trades[0];
    const last = trades[trades.length];

    // Formula : sell price - buy price, divide by buy price and then multiply by 100.
    return (((last - first) / first) * 100);
}






