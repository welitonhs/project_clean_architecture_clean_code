import { IDatabaseConnection } from "../../database/IDatabaseConnection";
import { IItemRepository } from "../../../domain/repository/IItemRepository";
import { Item } from "../../../domain/entity/Item";

class ItemRepositoryDatabase implements IItemRepository {

    constructor (readonly databaseConnection: IDatabaseConnection ){
        
    }

    async findById(id: number): Promise<Item> {
        const [ item ] = await this.databaseConnection.query("select * from items where id = $1", [id]);
        return new Item(item.id, item.category, item.description, item.price);
    }

}   

export { ItemRepositoryDatabase };