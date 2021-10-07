import { Coupon } from "../src/Coupon";

test("Deve criar um cupom quando não for passada a data de expiração", function(){
    const coupon = new Coupon("CUPOM22", 22);
    expect(coupon).toBeDefined();
});

test("Deve criar um cupom quando for passada a data de expiração", function(){
    const coupon = new Coupon("CUPOM22", 22, new Date('2022-09-06'));
    expect(coupon).toBeDefined();
});

test("Deve retornar verdadeiro caso o cupom já estiver com a data de expiração vencida", function(){
    const coupon = new Coupon('CUPOM15', 15, new Date('2021-09-06'));
    expect(coupon.isExpired(new Date('2021-10-01'))).toBeTruthy();
});
