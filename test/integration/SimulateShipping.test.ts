import { ISimulateShippingInput } from "../../src/application/dto/ISimulateShippingInput";
import { ISimulateShippingOutput } from "../../src/application/dto/ISimulateShippingOutput";
import { SimulatedShipping } from "../../src/application/usecase/SimulateShipping";
import { DatabaseConnectionAdapter } from "../../src/infra/database/DatabaseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";

let simulatedShipping: SimulatedShipping;

beforeAll(() => {
    const databaseConnection = new DatabaseConnectionAdapter();
    simulatedShipping = new SimulatedShipping(new DatabaseRepositoryFactory(databaseConnection));
})

test('Deve ser possível simular o valor do frete', async function() {
    const input: ISimulateShippingInput = {
        shippingItems: [
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
    };
    const output:ISimulateShippingOutput = await simulatedShipping.execute(input);
    expect(output.value).toBe(320);
});

test('Deve ser possível simular o valor do frete', async function(){
    const input: ISimulateShippingInput = {
        shippingItems: [
            {
                id: 4,
                quantity: 1
            },
        ]
    }
    const output:ISimulateShippingOutput = await simulatedShipping.execute(input);
    expect(output.value).toBe(30);
})


test('Deve retornar uma exception caso não tenha encontrado um item', async function() {
    const input: ISimulateShippingInput = {
        shippingItems: [
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
        ],
    };
    await expect(simulatedShipping.execute(input)).rejects.toThrow(new Error('Item not found'));
});

