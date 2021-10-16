interface IShippingItems {
    id: number;
    quantity: number;
}

interface ISimulateShippingInput {
    shippingItems: IShippingItems[]
}

export { ISimulateShippingInput }