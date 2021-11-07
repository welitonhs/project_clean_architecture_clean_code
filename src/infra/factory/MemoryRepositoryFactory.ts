import { IAbstractRepositoryFactory } from "../../domain/factory/IAbstractRepositoryFactory";
import { ICouponRepository } from "../../domain/repository/ICouponRepository";
import { IItemRepository } from "../../domain/repository/IItemRepository";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { CouponRepositoryMemory } from "../repository/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../repository/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../repository/memory/OrderRepositoryMemory";

class MemoryRepositoryFactory implements IAbstractRepositoryFactory {
  itemRepository(): IItemRepository {
    return new ItemRepositoryMemory();
  }
  couponRepository(): ICouponRepository {
    return new CouponRepositoryMemory();
  }
  orderRepository(): IOrderRepository {
    return new OrderRepositoryMemory();
  }

}

export { MemoryRepositoryFactory }