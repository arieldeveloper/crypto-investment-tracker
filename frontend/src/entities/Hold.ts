import  Trade  from "./Trade"
import  Coin  from "./Coin"
import { calculateBaseStats } from "../services/coinService";

export default class Hold {

    coin: Coin;
    trades: Array<Trade>;
    selected: Boolean;
    data: object;
    amount: number;
    spent: number;

  
    constructor(coin: Coin, trades: Array<Trade>, amount: number, spent: number) {
      this.coin = coin;
      this.selected = false;
      this.trades = trades;
      this.data = null;
      this.amount = amount;
      this.spent = spent;
    }

    setData(amount: number, spent: number){
      this.amount = amount;
      this.spent = spent;
      let updatedData = calculateBaseStats(this);
      this.data = updatedData;
    }

    addTrade(trade: Trade) {
      this.trades.push(trade);
      this.amount += trade.amount;
      this.spent += trade.amount * trade.value;
    }

    addTrades(trades: Array<Trade>) {
      for (const trade of trades) {
        this.trades.push(trade);
      }
    }

    select() {
      this.selected = true;
    }

    deselect() {
      this.selected = false;
    }

}