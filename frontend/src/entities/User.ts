import  Hold  from "./Hold"

export default class User {

    name: string;
    stocks: Array<Hold>

    constructor(name: string, hold: Array<Hold>) {
      this.name = name;
      this.stocks = hold;
    }


    addHold(stock: Hold) {
      this.stocks.push(stock);
    }

}