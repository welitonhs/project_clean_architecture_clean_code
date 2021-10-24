import { PlaceOrder } from "../../src/application/usecase/PlaceOrder";
import { IPlaceOrderInput } from "../../src/application/dto/IPlaceOrderInput";
import { DatabaseConnectionAdapter } from "../../src/infra/database/DatabaseConnectionAdapter";
import { ItemRepositoryDatabase } from "../../src/infra/repository/database/ItemRepositoryDatabase";
import { OrderRepositoryDatabase } from "../../src/infra/repository/database/OrderRepositoryDatabase";
import { CouponRepositoryDatabase } from "../../src/infra/repository/database/CouponRepositoryDatabase";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepositoryDatabase;
let itemRepository: ItemRepositoryDatabase;
let couponRepository: CouponRepositoryDatabase;

beforeAll(() => {
    const databaseConnection = new DatabaseConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(databaseConnection);
    orderRepository = new OrderRepositoryDatabase(databaseConnection);
    couponRepository = new CouponRepositoryDatabase(databaseConnection);

    placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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
    let quantity_orders = await orderRepository.count();
    const sequence_order = `${quantity_orders}`.padStart(8, "0");
    expect(output.orderCode).toBe(`2021${sequence_order}`);
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