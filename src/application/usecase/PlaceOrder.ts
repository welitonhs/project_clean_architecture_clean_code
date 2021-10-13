import { IItemRepository } from "../../domain/repository/IItemRepository";
import { Order } from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";

class PlaceOrder {
    
    constructor(readonly itemRepository: IItemRepository, readonly orderRepository: IOrderRepository){
        
    }

    async execute(input: any): Promise<any> {  
        const order = new Order(input.cpf);
        for(const ordemItem of input.ordemItems){
            const item = await this.itemRepository.findById(ordemItem.id);
            order.addItem(item, ordemItem.quantity);
        }
        this.orderRepository.save(order);
        return { 
            total: order.getTotal()
        };
    }
}

export { PlaceOrder };