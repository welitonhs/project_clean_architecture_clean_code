import { IItemRepository } from "../../domain/repository/IItemRepository";
import { Order } from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { IPlaceOrderInput } from "../dto/IPlaceOrderInput";
import { IPlaceOrderOutput } from "../dto/IPlaceOrderOutput";
import { ICouponRepository } from "../../domain/repository/ICouponRepository";

class PlaceOrder {
    
    constructor(readonly itemRepository: IItemRepository, readonly orderRepository: IOrderRepository, readonly couponRepository: ICouponRepository){
        
    }

    async execute(input: IPlaceOrderInput): Promise<IPlaceOrderOutput> {
        let sequence = await this.orderRepository.count();
        const order = new Order(input.cpf, ++sequence, input.issueDate);
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.findById(orderItem.id);
            order.addItem(item, orderItem.quantity);
        }
        if(input.coupon){
            const coupon = await this.couponRepository.findByCode(input.coupon);
            order.addCoupon(coupon);
        }
        this.orderRepository.save(order);
        return {
            orderCode: order.orderCode.value,
            total: order.getTotal()
        }
    }
}

export { PlaceOrder };