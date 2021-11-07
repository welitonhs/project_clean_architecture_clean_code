import { IAbstractRepositoryFactory } from "../../domain/factory/IAbstractRepositoryFactory";
import { ICouponRepository } from "../../domain/repository/ICouponRepository";
import { IValidateCouponInput } from "../dto/IValidateCouponInput";
import { IValidateCouponOutput } from "../dto/IValidateCouponOutput";

class ValidateCoupon {
    couponRepository: ICouponRepository;

    constructor(abstractRepositoryFactory: IAbstractRepositoryFactory){
        this.couponRepository = abstractRepositoryFactory.couponRepository();
    }

    async execute(input: IValidateCouponInput): Promise<IValidateCouponOutput> {
        const coupon = await this.couponRepository.findByCode(input.codeCoupon);
        const validate = !coupon.isExpired(input.today);
        return {
            validCoupon : validate
        };
    }
}

export { ValidateCoupon }