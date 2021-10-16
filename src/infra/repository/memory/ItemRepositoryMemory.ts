import { IItemRepository } from "../../../domain/repository/IItemRepository";
import { Item } from "../../../domain/entity/Item";

class ItemRepositoryMemory implements IItemRepository{
    items: Item[];
    
    constructor() {
        this.items = [
            new Item(1, "Materiais Esportivos", "Bola de Rugby", 100, 50, 20, 20, 0.5),
            new Item(2, "Materiais Esportivos", "Coletes para treino", 10, 55, 85, 0, 0.1),
            new Item(3, "Materiais Esportivos", "Chuteiras", 250, 10, 45, 5, 0.6),
            new Item(4, "Instrumentos Musicais", "Guitarra", 1500, 100, 30, 10, 3),
        ];
    }

    async findById(id: number): Promise<Item> {
        const item = await this.items.find(item => item.id === id);
        if (!item) throw new Error('Item not found');
        return item;
    }

}

export { ItemRepositoryMemory }