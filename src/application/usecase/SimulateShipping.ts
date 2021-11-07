import { IAbstractRepositoryFactory } from "../../domain/factory/IAbstractRepositoryFactory";
import { IItemRepository } from "../../domain/repository/IItemRepository";
import { ISimulateShippingInput } from "../dto/ISimulateShippingInput";
import { ISimulateShippingOutput } from "../dto/ISimulateShippingOutput";

class SimulatedShipping {
    itemRepository: IItemRepository;

    constructor(abstractRepositoryFactory: IAbstractRepositoryFactory){
        this.itemRepository = abstractRepositoryFactory.itemRepository();
    }

    async execute(input: ISimulateShippingInput): Promise<ISimulateShippingOutput> {
        let totalSimulatedShipping = 0;
        for(const shippingItem of input.shippingItems){
            const item = await this.itemRepository.findById(shippingItem.id);
            totalSimulatedShipping += item.getFreight() * shippingItem.quantity;
        }
        return {
            value: totalSimulatedShipping
        };
    }

}

export { SimulatedShipping }