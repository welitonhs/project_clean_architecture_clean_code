import { OrderCode } from "../../src/domain/entity/OrderCode";

test('Deve gerar um codigo para o pedido', function(){
    const sequence = 1;
    const date = new Date('2021-10-01');
    const orderCode = new OrderCode(sequence, date);
    const code = orderCode.value;
    expect(code).toBe('202100000001')
});