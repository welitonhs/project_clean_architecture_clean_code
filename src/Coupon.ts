class Coupon {

    constructor(readonly code: string, readonly percentage: number, readonly expireDate?: Date){

    }

    isExpired(today: Date): boolean {
        if(!this.expireDate) return false;
        return this.expireDate > today ? false : true;
    }
}

export { Coupon };