import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { Order } from "../../../domain/entity/Order";

class OrderRepositoryMemory implements IOrderRepository {
    orders: Order[];

    constructor(){
        this.orders = [];
    }

    save(order: Order): void {
        this.orders.push(order);
    }

    async count(): Promise<number> {
        return this.orders.length;
    }
}

export { OrderRepositoryMemory }
