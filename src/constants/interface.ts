export interface order {
    isFinished: boolean;
    docID: string;
    totalAmount: number;
    date: number;
    foods: { [key: string]: number };
}