interface IOrderItems {
    id: number,
    quantity: number,
}

class PlaceOrderInput {

    constructor(readonly cpf: string, readonly sequence: number, readonly date: Date, readonly orderItems: IOrderItems[]){

    }

}

export { PlaceOrderInput }