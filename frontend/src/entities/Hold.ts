import  Trade  from "./Trade"
import  Coin  from "./Coin"

export default class Hold {

    coin: Coin;
    trades: Array<Trade>;
    average: number;
    selected: Boolean;
  
    constructor(coin: Coin) {
      this.coin = coin;
      this.selected = false;
      this.trades = Array<Trade>();
      this.average = 0;
    }

    addTrade(trade: Trade) {
      this.trades.push(trade);
      this.average += trade.value;
    }

    select() {
      this.selected = true;
    }

    deselect() {
      this.selected = false;
    }

}