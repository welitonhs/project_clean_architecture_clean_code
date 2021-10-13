interface IDatabaseConnection {
    query(statement: string, params: any): any;
}

export { IDatabaseConnection }