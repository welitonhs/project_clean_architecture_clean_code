class OrderCode {
    value: string;

    constructor(readonly sequence: number, readonly date: Date){
        const year = date.getFullYear();
        const sequence8Char = `${sequence}`.padStart(8, "0");
        this.value = `${year}${sequence8Char}`;
    }
}

export { OrderCode }