import { IItemRepository } from "../../../domain/repository/IItemRepository";
import { Item } from "../../../domain/entity/Item";

class ItemRepositoryMemory implements IItemRepository{
    items: Item[];
    
    constructor() {
        this.items = [
            new Item(1, "Materiais Esportivos", "Bola de Rugby", 100),
            new Item(2, "Materiais Esportivos", "Coletes para treino", 10),
            new Item(3, "Materiais Esportivos", "Chuteiras", 250),
        ];
    }

    async findById(id: number): Promise<Item> {
        const item = await this.items.find(item => item.id === id);
        if (!item) throw new Error('Item not found');
        return item;
    }

}

export { ItemRepositoryMemory }