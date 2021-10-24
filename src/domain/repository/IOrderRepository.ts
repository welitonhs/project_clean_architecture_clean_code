import { Order } from "../entity/Order";

interface IOrderRepository {
    save(order: Order): void;
    count(): Promise<number>;
}

export { IOrderRepository }