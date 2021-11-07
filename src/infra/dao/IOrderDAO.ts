import { IOrderDTO } from "../../application/dto/IOrderDTO";
import { IOrderItemsDTO } from "../../application/dto/IOrderItemsDTO";

interface IOrderDao {

  getOrders(): Promise<IOrderDTO[]>;
  getOrder(code: string): Promise<IOrderDTO>;
  getOrderItems(idOrder: number): Promise<IOrderItemsDTO[]>;
}

export { IOrderDao };
