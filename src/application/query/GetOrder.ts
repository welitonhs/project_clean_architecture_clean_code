import { IGetOrderOutput } from "../dto/IGetOrderOutput";
import { IOrderDao } from "../../infra/dao/IOrderDAO";

class GetOrder {
  constructor(readonly orderDAO: IOrderDao) {

  }

  async execute(code: string): Promise<IGetOrderOutput> {
    const orderData = await this.orderDAO.getOrder(code);
    const orderItemsData = await this.orderDAO.getOrderItems(orderData.id);
    return {
      id: orderData.id,
      code: orderData.code,
      cpf: orderData.cpf,
      items: orderItemsData,
      total: orderData.total,
      freight: orderData.freight,
    }
  }
}

export { GetOrder };