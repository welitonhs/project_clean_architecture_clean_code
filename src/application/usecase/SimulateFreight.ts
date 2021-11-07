import { IAbstractRepositoryFactory } from "../../domain/factory/IAbstractRepositoryFactory";
import { IItemRepository } from "../../domain/repository/IItemRepository";
import { FreightCalculator } from "../../domain/service/FreightCalculator";
import { ISimulateFreightInput } from "../dto/ISimulateFreightInput";
import { ISimulateFreightOutput } from "../dto/ISimulateFreightOutput";

class SimulateFreight {
    itemRepository: IItemRepository;

    constructor(abstractRepositoryFactory: IAbstractRepositoryFactory){
        this.itemRepository = abstractRepositoryFactory.itemRepository();
    }

    async execute(input: ISimulateFreightInput): Promise<ISimulateFreightOutput> {
        let totalSimulatedFreight = 0;
        for(const freightItem of input.freightItems){
            const item = await this.itemRepository.findById(freightItem.id);
            totalSimulatedFreight += FreightCalculator.calculate(item) * freightItem.quantity;
        }
        return {
            value: totalSimulatedFreight
        };
    }

}

export { SimulateFreight }