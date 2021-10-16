import { IDatabaseConnection } from "../../database/IDatabaseConnection";
import { IItemRepository } from "../../../domain/repository/IItemRepository";
import { Item } from "../../../domain/entity/Item";

class ItemRepositoryDatabase implements IItemRepository {

    constructor (readonly databaseConnection: IDatabaseConnection ){
        
    }

    async findById(id: number): Promise<Item> {
        const [ item ] = await this.databaseConnection.query("select * from items where id = $1", [id]);
        const newItem = new Item(
            item.id, 
            item.category, 
            item.description, 
            item.price, 
            item.width, 
            item.height, 
            item.length, 
            item.weight
        );
        return newItem;
    }

}   

export { ItemRepositoryDatabase };