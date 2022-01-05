// import entities
/**
 * This function returns the dollar cost average given a list of trades from the user
 * @param trades a list of trade objects, holding
 */
function calculateCostAverage(trades) {
    let average = 0;
    for (const trade of trades) {
        average += trade.price;
    }
    return average / trade.amount;
}

/**
 * Calculate the growth percentage of the coin given the list of trades
 * Looks through to find the first and last trade and caluclates the profit percentage
 * Assumes that the list of trades is already sorted
 * @param trades
 */
function calculateGrowthPercentage(trades) {
    const first = trades[0];
    const last = trades[trades.length];

    // Formula : sell price - buy price, divide by buy price and then multiply by 100.
    return (((last - first) / first) * 100);
}





