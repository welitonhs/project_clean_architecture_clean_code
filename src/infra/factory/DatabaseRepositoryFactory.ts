import { IAbstractRepositoryFactory } from "../../domain/factory/IAbstractRepositoryFactory";
import { ICouponRepository } from "../../domain/repository/ICouponRepository";
import { IItemRepository } from "../../domain/repository/IItemRepository";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { IDatabaseConnection } from "../database/IDatabaseConnection";
import { CouponRepositoryDatabase } from "../repository/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "../repository/database/ItemRepositoryDatabase";
import { OrderRepositoryDatabase } from "../repository/database/OrderRepositoryDatabase";

class DatabaseRepositoryFactory implements IAbstractRepositoryFactory {

  constructor(readonly databaseConnection: IDatabaseConnection){}

  itemRepository(): IItemRepository {
    return new ItemRepositoryDatabase(this.databaseConnection);
  }
  couponRepository(): ICouponRepository {
    return new CouponRepositoryDatabase(this.databaseConnection);
  }
  orderRepository(): IOrderRepository {
    return new OrderRepositoryDatabase(this.databaseConnection);
  }

}

export { DatabaseRepositoryFactory }
