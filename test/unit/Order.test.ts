import { Coupon } from "../../src/domain/entity/Coupon";
import { Item } from "../../src/domain/entity/Item";
import { Order } from "../../src/domain/entity/Order";

test("Não deve ser possível criar um pedido com cpf inválido!", function(){
    expect(() => new Order("111.111.111-11", 1)).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido", function(){
    const order = new Order("554.624.620-00", 1);
    expect(order).toBeDefined();
});

test("Deve criar um pedido com três itens", function(){
    const order = new Order("554.624.620-00", 1);
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100), 8);
    order.addItem(new Item(2, "Materiais Esportivos", "Coletes para treino", 10), 20);
    order.addItem(new Item(3, "Materiais Esportivos", "Chuteiras", 250), 4);
    const total = order.getTotal();
    expect(total).toBe(2000);
});

test("Deve criar um pedido com três itens e cupom de desconto", function(){
    const order = new Order("554.624.620-00", 1);
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100), 8);
    order.addItem(new Item(2, "Materiais Esportivos", "Coletes para treino", 10), 20);
    order.addItem(new Item(3, "Materiais Esportivos", "Chuteiras", 250), 4);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(1600);

});

test("Não deve aplicar o desconto caso o cupom estiver expirado", function() {
    const order = new Order("554.624.620-00", 1, new Date('2021-09-01'));
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100), 8);
    order.addItem(new Item(2, "Materiais Esportivos", "Coletes para treino", 10), 20);
    order.addItem(new Item(3, "Materiais Esportivos", "Chuteiras", 250), 4);
    order.addCoupon(new Coupon("VALE20", 20, new Date('2021-08-01')));
    const total = order.getTotal();
    expect(total).toBe(2000);
});

test("Deve calcular o frete do pedido", function() {
    const order = new Order("554.624.620-00", 1, new Date('2021-09-01'));
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100, 50, 20, 20, 0.5), 8);
    order.addItem(new Item(2, "Materiais Esportivos", "Coletes para treino", 10, 55, 85, 0, 0.1), 20);
    order.addItem(new Item(3, "Materiais Esportivos", "Chuteiras", 250, 10, 45, 5, 0.6), 4);
    const freight = order.getFreight();
    expect(freight).toBe(320);
});

test("Deve gerar um pedido e retonar o código do pedido", function(){
    const order = new Order("554.624.620-00", 1, new Date('2021-09-01'));
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100, 50, 20, 20, 0.5), 8);
    expect(order.orderCode.value).toBe("202100000001");
});