import { IOrderDTO } from "./IOrderDTO";
import { IOrderItemsDTO } from "./IOrderItemsDTO";

interface IGetOrderOutput extends IOrderDTO {
  items: IOrderItemsDTO[];
}

export { IGetOrderOutput }