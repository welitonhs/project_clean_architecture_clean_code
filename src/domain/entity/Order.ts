import { Cpf } from "./Cpf";
import { Coupon } from "./Coupon";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

class Order {
    cpf: Cpf;
    orderItems: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;

    constructor(cpf: string, readonly issueDate: Date = new Date()) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
    }

    addItem(item:Item, quantity:number){
        this.freight += item.getFreight() * quantity;
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }

    addCoupon(coupon: Coupon){
        if(coupon.isExpired(this.issueDate)) return;
        this.coupon = coupon;
    }

    getCpf(){
        return this.cpf;
    }

    getFreight(){
        return this.freight;
    }

    getTotal(){
        let total = 0;
        for(const orderItem of this.orderItems) {
            total += orderItem.getTotal();
        }
        if(this.coupon) {
            total = total - (total * (this.coupon.percentage / 100));
        }
        return total;
    }
}

export { Order };