import { IItemRepository } from "../../domain/repository/IItemRepository";
import { Order } from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { PlaceOrderInput } from "../dto/PlaceOrderInput";
import { PlaceOrderOutput } from "../dto/PlaceOrderOutput";
import { PlaceOrderOutputAssembler } from "../dto/PlaceOrderOutputAssembler";

class PlaceOrder {
    
    constructor(readonly itemRepository: IItemRepository, readonly orderRepository: IOrderRepository){
        
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {  
        const order = new Order(input.cpf, input.sequence, new Date(input.date));
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.findById(orderItem.id);
            order.addItem(item, orderItem.quantity);
        }
        this.orderRepository.save(order);
        return PlaceOrderOutputAssembler.assembly(order);
    }
}

export { PlaceOrder };