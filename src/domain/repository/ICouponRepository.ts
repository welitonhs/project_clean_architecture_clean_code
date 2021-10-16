import { Coupon } from "../entity/Coupon";

interface ICouponRepository {
    findByCode(code: string): Promise<Coupon>;
}

export { ICouponRepository }