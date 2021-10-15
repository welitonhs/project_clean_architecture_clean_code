import { OrderItem } from "../../src/domain/entity/OrderItem";

test("Deve criar um item de pedido", function(){
    const orderItem = new OrderItem(1, 200, 5);
    expect(orderItem.getTotal()).toBe(1000);
});
