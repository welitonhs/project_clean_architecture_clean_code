import Order from "../src/Order";

test("Não deve ser possível criar um pedido com cpf inválido!", function(){
    expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});