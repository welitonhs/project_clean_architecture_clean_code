import { DatabaseConnectionAdapter } from "../src/infra/database/DatabaseConnectionAdapter";
import { ItemRepositoryDatabase } from "../src/infra/repository/database/ItemRepositoryDatabase";
import { ItemRepositoryMemory } from "../src/infra/repository/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../src/infra/repository/memory/OrderRepositoryMemory";
import { PlaceOrder } from "../src/application/usecase/PlaceOrder";

test('Deve ser possível gerar um pedido', async function(){
    const input = {
        cpf: '018.778.110-92',
        ordemItems: [
            {
                id: 1,
                quantity: 8
            },
            {
                id: 2,
                quantity: 20
            },
            {
                id: 3,
                quantity: 4
            }
        ]
    };
    const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(new DatabaseConnectionAdapter()), new OrderRepositoryMemory());
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(2000);
});

test('Deve retornar uma exception caso algum dos itens do pedido não exista', async function(){
    const input = {
        cpf: '018.778.110-92',
        ordemItems: [
            {
                id: 1,
                quantity: 8
            },
            {
                id: 2,
                quantity: 20
            },
            {
                id: 4,
                quantity: 4
            }
        ]
    };
    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
    await expect(placeOrder.execute(input)).rejects.toThrow(new Error('Item not found'));
});