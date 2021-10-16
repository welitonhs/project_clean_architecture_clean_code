import { ICouponRepository } from "../../domain/repository/ICouponRepository";
import { IValidateCouponInput } from "../dto/IValidateCouponInput";
import { IValidateCouponOutput } from "../dto/IValidateCouponOutput";

class ValidateCoupon {

    constructor(readonly repositoryCoupon: ICouponRepository){

    }

    async execute(input: IValidateCouponInput): Promise<IValidateCouponOutput> {
        const coupon = await this.repositoryCoupon.findByCode(input.codeCoupon);
        const validate = !coupon.isExpired(input.today);
        return {
            validCoupon : validate
        };
    }
}

export { ValidateCoupon }