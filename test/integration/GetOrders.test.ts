import { IPlaceOrderInput } from '../../src/application/dto/IPlaceOrderInput';
import { GetOrders } from '../../src/application/query/GetOrders';
import { PlaceOrder } from '../../src/application/usecase/PlaceOrder';
import { IOrderDao } from '../../src/infra/dao/IOrderDAO';
import { OrderDAODatabase } from '../../src/infra/dao/OrderDAODatabase';
import { DatabaseConnectionAdapter } from '../../src/infra/database/DatabaseConnectionAdapter';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';

let placeOrder: PlaceOrder;
let getOrders: GetOrders;
let orderDao: IOrderDao;

beforeAll(() => {
    const databaseConnection = new DatabaseConnectionAdapter();
    placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
    orderDao = new OrderDAODatabase(databaseConnection);
    getOrders = new GetOrders(orderDao);
})

test('Deve retornar todos os pedidos', async function(){
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
  await placeOrder.execute(input);
  const outputGetOrders = await getOrders.execute();
  expect(outputGetOrders.length).toBeGreaterThan(1);
});