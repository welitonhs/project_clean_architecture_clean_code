import { Coupon } from "../src/Coupon";
import { Item } from "../src/Item";
import Order from "../src/Order";

test("Não deve ser possível criar um pedido com cpf inválido!", function(){
    expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido", function(){
    const order = new Order("554.624.620-00");
    expect(order).toBeDefined();
});

test("Deve criar um pedido com três itens", function(){
    const order = new Order("554.624.620-00");
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100), 8);
    order.addItem(new Item(2, "Materiais Esportivos", "Coletes para treino", 10), 20);
    order.addItem(new Item(3, "Materiais Esportivos", "Chuteiras", 250), 4);
    const total = order.getTotal();
    expect(total).toBe(2000);
});

test("Deve criar um pedido com três itens e cupom de desconto", function(){
    const order = new Order("554.624.620-00");
    order.addItem(new Item(1, "Materiais Esportivos", "Bola de Rugby", 100), 8);
    order.addItem(new Item(2, "Materiais Esportivos", "Coletes para treino", 10), 20);
    order.addItem(new Item(3, "Materiais Esportivos", "Chuteiras", 250), 4);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(1600);
});