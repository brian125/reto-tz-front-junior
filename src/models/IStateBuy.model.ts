import { IPaginationBuy } from './IPaginationBuy.model';

export interface IStateBuy {
  isLoading: boolean;
  buys?: IPaginationBuy;
  error: string;
}
