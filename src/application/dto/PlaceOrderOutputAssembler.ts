import { Order } from "../../domain/entity/Order";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

class PlaceOrderOutputAssembler {

    static assembly(order: Order){
        return new PlaceOrderOutput(
            order.orderCode.value,
            order.getTotal()
        )
    }

}

export { PlaceOrderOutputAssembler }