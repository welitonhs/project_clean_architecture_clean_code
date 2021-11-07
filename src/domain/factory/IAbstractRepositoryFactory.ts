import { ICouponRepository } from "../repository/ICouponRepository";
import { IItemRepository } from "../repository/IItemRepository";
import { IOrderRepository } from "../repository/IOrderRepository";

interface IAbstractRepositoryFactory {
  itemRepository(): IItemRepository;
  couponRepository(): ICouponRepository;
  orderRepository(): IOrderRepository;
}

export { IAbstractRepositoryFactory }