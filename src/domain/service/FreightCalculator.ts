import { Item } from "../entity/Item";

class FreightCalculator {

  static calculate(item: Item){
    const distance = 1000;
    const minimum_freight = 10;
    const freight = distance * item.getVolume() * (item.getDensity()/100);
    return freight > minimum_freight ? freight : minimum_freight;
  }
}

export { FreightCalculator }