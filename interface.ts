export interface order {
  isFinished: boolean;
  docID: string;
  totalAmount: number;
  date: Date;
  foods: { [key: string]: number };
}

export interface menuList {
  [key: string]: {
    [key: string]: { name: string; price: string; image: string };
  };
}
