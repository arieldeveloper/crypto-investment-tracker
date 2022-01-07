import  Trade  from "./Trade"
import  Coin  from "./Coin"
import { calculateBaseStats } from "../services/coinService";

export default class Hold {

    coin: Coin;
    trades: Array<Trade>;
    selected: Boolean;
    data: object;

  
    constructor(coin: Coin, trades: Array<Trade>) {
      this.coin = coin;
      this.selected = false;
      this.trades = trades;
      this.data = calculateBaseStats(trades, coin);
    }

    setData(){
      let updatedData = calculateBaseStats(this.trades, this.coin)
      this.data = updatedData;
    }

    addTrade(trade: Trade) {
      this.trades.push(trade);
      this.setData();
    }

    select() {
      this.selected = true;
    }

    deselect() {
      this.selected = false;
    }

}