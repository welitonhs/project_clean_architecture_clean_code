import { IPlaceOrderInput } from '../../src/application/dto/IPlaceOrderInput';
import { GetOrder } from '../../src/application/query/GetOrder';
import { PlaceOrder } from '../../src/application/usecase/PlaceOrder';
import { IOrderDao } from '../../src/infra/dao/IOrderDAO';
import { OrderDAODatabase } from '../../src/infra/dao/OrderDAODatabase';
import { DatabaseConnectionAdapter } from '../../src/infra/database/DatabaseConnectionAdapter';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';

let placeOrder: PlaceOrder;
let orderDao: IOrderDao;
let getOrder: GetOrder;

beforeAll(() => {
    const databaseConnection = new DatabaseConnectionAdapter();
    placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
    orderDao = new OrderDAODatabase(databaseConnection);
    getOrder = new GetOrder(orderDao);
})

test('Deve retornar os dados de um pedido', async function(){
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
  const outputPlaceOrder = await placeOrder.execute(input);
  const outputGetOrder = await getOrder.execute(outputPlaceOrder.orderCode);
  expect(outputGetOrder.total).toBe(2000);
});