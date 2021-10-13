import { Item } from "../entity/Item";

interface IItemRepository {
    findById(id: number): Promise<Item>;
}

export { IItemRepository }