export default class Coin {

    name: string;
    value: number;
  
    constructor(name: string, value: number) {
      this.name = name;
      this.value = value;
    }

    changeValue(val: number) {
      this.value = val;
    }

}