class Item {
    DISTANCE = 1000;
    MINIMUM_FREIGHT = 10;

    constructor(
        readonly id:number, 
        readonly category: string, 
        readonly description: string, 
        readonly price: number,
        readonly width: number = 0,
        readonly height: number = 0,
        readonly length: number = 0,
        readonly weight: number = 0,
        ){
            
    }

    getVolume(){
        return (this.width/100) * (this.height/100) * (this.length/100);
    }

    getDensity(){
        return Math.trunc(this.weight / this.getVolume());
    }

    getFreight(){
        const freight = this.DISTANCE * this.getVolume() * (this.getDensity()/100);
        return freight > this.MINIMUM_FREIGHT ? freight : this.MINIMUM_FREIGHT;
    }
}

export { Item };