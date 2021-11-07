interface IOrderDTO {
  id: number;
  code: string;
  cpf: string;
  total: number;
  freight: number;
}

export { IOrderDTO }