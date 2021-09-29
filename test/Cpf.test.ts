import { Cpf } from "../src/Cpf"

test("Deve validar um cpf", function(){
    const cpf = new Cpf("847.903.332-05");
    expect(cpf).toBeDefined();
});

test("Deve retornar um erro ao validar um cpf inválido", function(){
    expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});

test("Deve retornar um erro ao validar um cpf maior que o permitido", function(){
    expect(() => new Cpf("111.111.111-111111111")).toThrow(new Error("Invalid cpf"));
});

test("Deve retornar um erro ao validar um cpf null", function(){
    expect(() => new Cpf("undefined")).toThrow(new Error("Invalid cpf"));
});