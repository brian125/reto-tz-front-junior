import { IStateProduct } from "./IStateProduct.model";
import { IStateBuy } from './IStateBuy.model';

export interface IRootReducer {
  products: IStateProduct;
  buys: IStateBuy;
}
