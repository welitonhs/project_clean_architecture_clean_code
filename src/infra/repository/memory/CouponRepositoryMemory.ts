import { Coupon } from "../../../domain/entity/Coupon";
import { ICouponRepository } from "../../../domain/repository/ICouponRepository";

class CouponRepositoryMemory implements ICouponRepository {
    coupons: Coupon[];

    constructor(){
        this.coupons = [
            new Coupon('CUPOM22', 22, new Date('2021-11-30')),
            new Coupon('CUPOM50', 50, new Date('2020-11-30'))
        ];
    }

    async findByCode(code: string): Promise<Coupon> {
        const coupon = await this.coupons.find(coupon => coupon.code === code);
        if (!coupon) throw new Error('Coupon not found');
        return coupon;
    }

}

export { CouponRepositoryMemory }