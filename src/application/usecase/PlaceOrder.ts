import { IItemRepository } from "../../domain/repository/IItemRepository";
import { Order } from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { IPlaceOrderInput } from "../dto/IPlaceOrderInput";
import { IPlaceOrderOutput } from "../dto/IPlaceOrderOutput";
import { ICouponRepository } from "../../domain/repository/ICouponRepository";
import { IAbstractRepositoryFactory } from "../../domain/factory/IAbstractRepositoryFactory";
import { FreightCalculator } from "../../domain/service/FreightCalculator";

class PlaceOrder {
    orderRepository: IOrderRepository;
    itemRepository: IItemRepository;
    couponRepository: ICouponRepository;
    
    constructor(abstractRepository: IAbstractRepositoryFactory){
        this.orderRepository = abstractRepository.orderRepository();
        this.itemRepository = abstractRepository.itemRepository();
        this.couponRepository = abstractRepository.couponRepository();
    }

    async execute(input: IPlaceOrderInput): Promise<IPlaceOrderOutput> {
        let sequence = await this.orderRepository.count();
        const nextSequence = sequence + 1;
        const order = new Order(input.cpf, nextSequence, input.issueDate);
        let freight = 0;
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.findById(orderItem.id);
            freight += FreightCalculator.calculate(item) * orderItem.quantity;
            order.addItem(item, orderItem.quantity);
        }
        order.setFreight(freight);
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