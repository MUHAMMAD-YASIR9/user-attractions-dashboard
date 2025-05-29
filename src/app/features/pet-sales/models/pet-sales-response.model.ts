export interface WeeklySalesResponse {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export interface DailySalesItem {
  date: string;
  animal: string;
  price: string;
}

export type DailySalesResponse = DailySalesItem[];