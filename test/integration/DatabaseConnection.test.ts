import { DatabaseConnectionAdapter } from "../../src/infra/database/DatabaseConnectionAdapter"

test("Deve criar uma conexão com o banco de dados", async function () {
    const databaseConnection = new DatabaseConnectionAdapter();
    const items = await databaseConnection.query("select * from items", []);
    const lengthItems = items.length;
    expect(items).toHaveLength(lengthItems);
})