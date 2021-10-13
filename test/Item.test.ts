import { Item } from "../src/domain/entity/Item";

test("Deve criar um item", function(){
    const item = new Item(1, 'Instrumentos Musicais', 'Guitarra', 5500, 100, 30, 10, 3);
    expect(item).toBeDefined();
})

test("Deve retornar o volume do item", function() {
    const item = new Item(1, 'Instrumentos Musicais', 'Guitarra', 5500, 100, 30, 10, 3);
    expect(item.getVolume()).toBe(0.03);
});

test("Deve retornar a densidade do item", function() {
    const item = new Item(1, 'Instrumentos Musicais', 'Guitarra', 5500, 100, 30, 10, 3);
    expect(item.getDensity()).toBe(100);
});

test("Deve calcular o frete do item", function(){
    const item = new Item(1, 'Instrumentos Musicais', 'Guitarra', 5500, 100, 30, 10, 3);
    expect(item.getFreight()).toBe(30);
})

test("Deve calcular o frete do item", function(){
    const item = new Item(1, 'Eletro', 'Geladeira', 3500, 200, 100, 50, 40);
    expect(item.getFreight()).toBe(400);
})

test("Deve retornar o valor minimo de frete caso o calculo do frete seja menor", function(){
    const item = new Item(1, 'Fotografia', 'Camera', 11500, 20, 15, 10, 1);
    expect(item.getFreight()).toBe(10);
})