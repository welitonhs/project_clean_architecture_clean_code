export class Cpf{
    value: string;
    CPF_LENGTH_CPF = 11;
    FACTOR_FIRST_DIGIT_VERIFY = 10;
    FACTOR_SECOND_DIGIT_VERIFY = 11;

    constructor(value: string){
        if(!this.validate(value)) throw new Error("Invalid cpf");
        this.value = value;
    }

    private validate(rawCpf:string) {
        if(!rawCpf) return false;
        const cpf = this.cleanCPF(rawCpf);
        if(!(cpf.length === this.CPF_LENGTH_CPF)) return false;
        if(this.allDigitsCpfAreEquals(cpf)) return false;
        const firstVerifiedDigit = this.calculateVerifyDigitCpf(cpf, this.FACTOR_FIRST_DIGIT_VERIFY);
        const secondVerifiedDigit = this.calculateVerifyDigitCpf(cpf, this.FACTOR_SECOND_DIGIT_VERIFY);
        const nDigVerific = this.extractVerifierDigit(cpf);  
        return nDigVerific === `${firstVerifiedDigit}${secondVerifiedDigit}`;
    }

    private cleanCPF(rawCpf: string): string {
        return rawCpf.replace(/\D/g,'');
    }

    private allDigitsCpfAreEquals(cpf: string):boolean {
        return (cpf.split('').every(char => char === cpf[0]));
    }

    private calculateVerifyDigitCpf(cpf: string, factor: number): number {
        let total = 0;
        for(const digit of cpf){
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const rest = total%11;
        return rest < 2 ? 0 : (11 - rest);
    }

    private extractVerifierDigit(cpf: string): string {
        return cpf.slice(9);
    }
}