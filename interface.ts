export interface order {
    isFinished: boolean;
    docID: string;
    totalAmount: number;
    date: Date;
    foods: { [key: string]: number };
}