interface IPlaceOrderInput {
    cpf: string;
    issueDate: Date;    
    orderItems: any[];
    coupon?: string;
}

export { IPlaceOrderInput }