import { IItemRepository } from "../../domain/repository/IItemRepository";
import { Order } from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { IPlaceOrderInput } from "../dto/IPlaceOrderInput";
import { IPlaceOrderOutput } from "../dto/IPlaceOrderOutput";

class PlaceOrder {
    
    constructor(readonly itemRepository: IItemRepository, readonly orderRepository: IOrderRepository){
        
    }

    async execute(input: IPlaceOrderInput): Promise<IPlaceOrderOutput> {  
        const order = new Order(input.cpf, input.sequence, new Date(input.date));
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.findById(orderItem.id);
            order.addItem(item, orderItem.quantity);
        }
        this.orderRepository.save(order);
        return {
            orderCode: order.orderCode.value,
            total: order.getTotal()
        }
    }
}

export { PlaceOrder };