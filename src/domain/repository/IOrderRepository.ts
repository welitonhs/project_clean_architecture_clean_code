import { Order } from "../entity/Order";

interface IOrderRepository {
    save(order: Order): void;
}

export { IOrderRepository }