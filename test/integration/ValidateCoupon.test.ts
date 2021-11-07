import { IValidateCouponInput } from "../../src/application/dto/IValidateCouponInput";
import { ValidateCoupon } from "../../src/application/usecase/ValidateCoupon";
import { DatabaseConnectionAdapter } from "../../src/infra/database/DatabaseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";

let validateCoupon: ValidateCoupon;

beforeAll(()=>{
    const databaseConnection = new DatabaseConnectionAdapter();
    validateCoupon = new ValidateCoupon(new DatabaseRepositoryFactory(databaseConnection));
});

test('Deve retornar verdadeiro se o cupom de desconto não estiver com data de expiração vencida', async function(){
    const input: IValidateCouponInput = {
        codeCoupon: 'CUPOM22',
        today: new Date('2021-10-16')
    };
    const output = await validateCoupon.execute(input);
    expect(output.validCoupon).toBeTruthy();
});

test('Deve retornar falso se o cupom de desconto estiver com data de expiração vencida', async function(){
    const input: IValidateCouponInput = {
        codeCoupon: 'CUPOM50',
        today: new Date(),
    }
    const output = await validateCoupon.execute(input);
    expect(output.validCoupon).toBeFalsy();
});

test('Deve retornar uma exception caso não encontre o cupom de desconto', async function () {
    const input: IValidateCouponInput = {
        codeCoupon: 'CUPOM33',
        today: new Date(),
    };
    await expect(validateCoupon.execute(input)).rejects.toThrow(new Error('Coupon not found'));
});

test('Deve retornar verdadeiro se o cupom de desconto não estiver com data de expiração vencida - database', async function(){
    const input: IValidateCouponInput = {
        codeCoupon: 'CUPOM22',
        today: new Date('2021-10-16')
    };
    const output = await validateCoupon.execute(input);
    expect(output.validCoupon).toBeTruthy();
});

test('Deve retornar falso se o cupom de desconto estiver com data de expiração vencida - database', async function(){
    const input: IValidateCouponInput = {
        codeCoupon: 'CUPOM50',
        today: new Date(),
    }
    const output = await validateCoupon.execute(input);
    expect(output.validCoupon).toBeFalsy();
});

test('Deve retornar uma exception caso não encontre o cupom de desconto - database', async function () {
    const input: IValidateCouponInput = {
        codeCoupon: 'CUPOM33',
        today: new Date(),
    };
    await expect(validateCoupon.execute(input)).rejects.toThrow(new Error('Coupon not found'));
});
