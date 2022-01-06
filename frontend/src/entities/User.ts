import { calculatePortfolioStats } from "../services/portfolioService";
import  Hold  from "./Hold"

export default class User {

    name: string;
    stocks: Array<Hold>;
    data: object;

    constructor(name: string, hold: Array<Hold>) {
      this.name = name;
      this.stocks = hold;
      this.data = calculatePortfolioStats(hold);
    }

    updateData() {
      this.data = calculatePortfolioStats(this.stocks);
    }

    addHold(stock: Hold) {
      this.stocks.push(stock);
      this.updateData();
    }

}