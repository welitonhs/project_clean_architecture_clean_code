import { ISimulateFreightInput } from "../../src/application/dto/ISimulateFreightInput";
import { ISimulateFreightOutput } from "../../src/application/dto/ISimulateFreightOutput";
import { SimulateFreight } from "../../src/application/usecase/SimulateFreight";
import { DatabaseConnectionAdapter } from "../../src/infra/database/DatabaseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";

let simulatedFreight: SimulateFreight;

beforeAll(() => {
    const databaseConnection = new DatabaseConnectionAdapter();
    simulatedFreight = new SimulateFreight(new DatabaseRepositoryFactory(databaseConnection));
})

test('Deve ser possível simular o valor do frete', async function() {
    const input: ISimulateFreightInput = {
        freightItems: [
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
    const output:ISimulateFreightOutput = await simulatedFreight.execute(input);
    expect(output.value).toBe(320);
});

test('Deve ser possível simular o valor do frete', async function(){
    const input: ISimulateFreightInput = {
        freightItems: [
            {
                id: 4,
                quantity: 1
            },
        ]
    }
    const output:ISimulateFreightOutput = await simulatedFreight.execute(input);
    expect(output.value).toBe(30);
})


test('Deve retornar uma exception caso não tenha encontrado um item', async function() {
    const input: ISimulateFreightInput = {
        freightItems: [
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
    await expect(simulatedFreight.execute(input)).rejects.toThrow(new Error('Item not found'));
});

