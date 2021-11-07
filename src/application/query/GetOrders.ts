import { IGetOrderOutput } from "../dto/IGetOrderOutput";
import { IOrderDao } from "../../infra/dao/IOrderDAO";

class GetOrders {
  constructor(readonly orderDao: IOrderDao) {

  }

  async execute(): Promise<IGetOrderOutput[]> {
    const ordersOutput:IGetOrderOutput[] = [];
    const ordersData = await this.orderDao.getOrders();
    for(const orderData of ordersData) {
      const orderItemsData = await this.orderDao.getOrderItems(orderData.id);
      ordersOutput.push({ 
        id: orderData.id,
        code: orderData.code,
        cpf: orderData.cpf,
        total: orderData.total,
        freight: orderData.freight,
        items: orderItemsData,
      });
    }
    return ordersOutput;
  }
}

export { GetOrders };