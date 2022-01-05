import  Trade  from "./Trade"
import  Coin  from "./Coin"

export default class Hold {

    coin: Coin;
    trades: Array<Trade>;
    average: number;
    selected: Boolean;
  
    constructor(coin: Coin, trades: Array<Trade>) {
      this.coin = coin;
      this.selected = false;
      this.trades = trades;
    }

    addTrade(trade: Trade) {
      this.trades.push(trade);
    }

    select() {
      this.selected = true;
    }

    deselect() {
      this.selected = false;
    }

}