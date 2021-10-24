import { Coupon } from "../../../domain/entity/Coupon";
import { ICouponRepository } from "../../../domain/repository/ICouponRepository";
import { IDatabaseConnection } from "../../database/IDatabaseConnection";

class CouponRepositoryDatabase implements ICouponRepository {

    constructor(readonly databaseConnection: IDatabaseConnection){

    }

    async findByCode(code: string): Promise<Coupon> {
        const [ foundCoupon ] = await this.databaseConnection.query('select * from coupons where code = $1', [code]);
        if(!foundCoupon) throw new Error('Coupon not found');
        const coupon = new Coupon(
            foundCoupon.code,
            foundCoupon.percentage,
            foundCoupon.expire_date
        );
        return coupon;
    }

}

export { CouponRepositoryDatabase }