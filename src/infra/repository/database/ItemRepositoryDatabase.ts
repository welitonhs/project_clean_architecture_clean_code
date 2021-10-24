import { IDatabaseConnection } from "../../database/IDatabaseConnection";
import { IItemRepository } from "../../../domain/repository/IItemRepository";
import { Item } from "../../../domain/entity/Item";

class ItemRepositoryDatabase implements IItemRepository {

    constructor (readonly databaseConnection: IDatabaseConnection ){
        
    }

    async findById(id: number): Promise<Item> {
        const [ foundItem ] = await this.databaseConnection.query("select * from items where id = $1", [id]);
        if(!foundItem) throw new Error('Item not found');
        const item = new Item(
            foundItem.id, 
            foundItem.category, 
            foundItem.description, 
            foundItem.price, 
            foundItem.width, 
            foundItem.height, 
            foundItem.length, 
            foundItem.weight
        );
        return item;
    }

}   

export { ItemRepositoryDatabase };