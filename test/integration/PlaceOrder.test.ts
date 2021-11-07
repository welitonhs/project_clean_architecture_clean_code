import { PlaceOrder } from "../../src/application/usecase/PlaceOrder";
import { IPlaceOrderInput } from "../../src/application/dto/IPlaceOrderInput";
import { DatabaseConnectionAdapter } from "../../src/infra/database/DatabaseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import { OrderRepositoryDatabase } from "../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;

beforeAll(() => {
    const databaseConnection = new DatabaseConnectionAdapter();
    placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
})

test('Deve ser possível gerar um pedido com código', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        issueDate: new Date('2021-10-11'),
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
    const output = await placeOrder.execute(input);
    expect(output.orderCode).toHaveLength(12);
});

test('Deve ser possível gerar um pedido', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        issueDate: new Date('2021-10-11'),
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
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(2000);
});

test('Deve ser possível criar um pedido com cupom de desconto', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        issueDate: new Date('2021-10-11'),
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
        ],
        coupon: "CUPOM20"
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(1600);
});

test('Deve retornar uma exception caso algum dos itens do pedido não exista', async function(){
    const input: IPlaceOrderInput = {
        cpf: '018.778.110-92',
        issueDate: new Date('2021-10-11'),
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
    await expect(placeOrder.execute(input)).rejects.toThrow(new Error('Item not found'));
});