import { IOrderDTO } from "../../application/dto/IOrderDTO";
import { IOrderItemsDTO } from "../../application/dto/IOrderItemsDTO";
import { IDatabaseConnection } from "../database/IDatabaseConnection";
import { IOrderDao } from "./IOrderDAO";

class OrderDAODatabase implements IOrderDao {

  constructor(readonly databaseConnection: IDatabaseConnection){

  }

  async getOrders(): Promise<IOrderDTO[]> {
    const ordersData = await this.databaseConnection.query(`
      select 
        id, 
        code,
        cpf,
        freight::float,
        total::float
      from "order"
      `, []
    );
    return ordersData;
  }
  
  async getOrder(code: string): Promise<IOrderDTO> {
    const [ orderData ] = await this.databaseConnection.query(`
      select 
        id, 
        code,
        cpf,
        freight::float,
        total::float
      from "order"
      where
        code = $1
      `, [code]
    );
    return orderData;
  }

  async getOrderItems(idOrder: number): Promise<IOrderItemsDTO[]> {
    const orderItemsData = await this.databaseConnection.query(`
      select
        i.description, 
        oi.quantity,
        oi.price::float
      from order_item as oi
      join items as i on oi.id_item = i.id
      where
        id_order = $1
      `, [idOrder]
    );
    return orderItemsData;
  }
}

export { OrderDAODatabase }