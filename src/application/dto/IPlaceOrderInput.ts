interface IPlaceOrderInput {
    cpf: string;
    sequence: number;
    date: Date;    
    orderItems: any[];
}

export { IPlaceOrderInput }