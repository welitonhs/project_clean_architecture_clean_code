interface IFreightItems {
    id: number;
    quantity: number;
}

interface ISimulateFreightInput {
    freightItems: IFreightItems[]
}

export { ISimulateFreightInput }