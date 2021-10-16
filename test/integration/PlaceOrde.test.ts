import { ItemRepositoryMemory } from "../../src/infra/repository/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../../src/infra/repository/memory/OrderRepositoryMemory";
import { PlaceOrder } from "../../src/application/usecase/PlaceOrder";
import { IPlaceOrderInput } from "../../src/application/dto/IPlaceOrderInput";

test('Deve ser possível gerar um pedido', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        sequence: 1,
        date: new Date('2021-10-11'),
        orderItems: [
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
    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(2000);
});

test('Deve ser possível gerar um pedido com código', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        sequence: 1,
        date: new Date('2021-10-11'),
        orderItems: [
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
    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
    const output = await placeOrder.execute(input);
    expect(output.orderCode).toBe("202100000001");
});

test('Deve retornar uma exception caso algum dos itens do pedido não exista', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        sequence: 1,
        date: new Date('2021-10-11'),
        orderItems: [
            {
                id: 1,
                quantity: 8
            },
            {
                id: 2,
                quantity: 20
            },
            {
                id: 999,
                quantity: 4
            }
        ]
    };
    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
    await expect(placeOrder.execute(input)).rejects.toThrow(new Error('Item not found'));
});