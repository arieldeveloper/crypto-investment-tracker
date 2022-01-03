import  Hold  from "./Hold"

export default class User {

    name: string;
    stocks: Array<Hold>

    constructor(name: string) {
      this.name = name;
      this.stocks = Array<Hold>();
    }

    addHold(stock: Hold) {
      this.stocks.push(stock);
    }

}