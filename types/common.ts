export type ListType = {
    data: any[];
    Total: number;
    Headers: { Name: string }[];
    operation: { Total: number; create: any[]; edit: any[]; names: { Action: string }[] };
};
