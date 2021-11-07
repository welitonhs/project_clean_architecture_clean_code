import { Order } from "../../../domain/entity/Order";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { IDatabaseConnection } from "../../database/IDatabaseConnection";

class OrderRepositoryDatabase implements IOrderRepository {

    constructor(readonly databaseConnection: IDatabaseConnection) {
        
    }

    async save(order: Order): Promise<void> {
        const [ newOrder ] = await this.databaseConnection.query(`
            insert into "order" 
            (
                code, cpf, issue_date, freight, sequence, coupon, total
            ) 
            values 
            (
                $1, $2, $3, $4, $5, $6, $7
            ) returning *`, 
            [
                order.getCode(), 
                order.getCpf(), 
                order.issueDate, 
                order.getFreight(), 
                order.sequence,
                order.getCoupon(),
                order.getTotal()
            ]
        );
        for(const ordemItem of order.getItems()){
            await this.databaseConnection.query(`
                insert into order_item
                (
                    id_order, id_item, price, quantity
                )
                values
                (
                    $1, $2, $3, $4
                )`,
                [
                    newOrder.id,
                    ordemItem.idItem,
                    ordemItem.price,
                    ordemItem.quantity
                ]
            );
        }
    }

    async count(): Promise<number> {
        const [ orders ] = await this.databaseConnection.query('select count(*)::int from "order"', []);
        return parseInt(orders.count);
    }
    
}

export { OrderRepositoryDatabase }
