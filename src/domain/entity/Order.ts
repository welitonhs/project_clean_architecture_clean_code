import { Cpf } from "./Cpf";
import { Coupon } from "./Coupon";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";
import { OrderCode } from "./OrderCode";

class Order {
    cpf: Cpf;
    orderItems: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    orderCode: OrderCode;

    constructor(cpf: string, readonly sequence: number, readonly issueDate: Date = new Date()) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
        this.orderCode = new OrderCode(sequence, issueDate);
    }

    addItem(item:Item, quantity:number){
        this.freight += item.getFreight() * quantity;
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }

    getItems(){
        return this.orderItems;
    }

    addCoupon(coupon: Coupon){
        if(coupon.isExpired(this.issueDate)) return;
        this.coupon = coupon;
    }

    getCode(){
        return this.orderCode.value;
    }

    getCpf(){
        return this.cpf.value;
    }

    getCoupon(){
        return this.coupon?.code;
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