import { IBuy } from './IBuy.model';
export interface IStateBuy {
  isLoading: boolean;
  buys?: IBuy;
  error: string;
}
