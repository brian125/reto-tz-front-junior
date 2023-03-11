import { IProduct } from "./IProduct.model";
import { IBuy } from './IBuy.model';

export interface IPaginationBuy {
  buys?: IBuy[];
  totalElements: number
}
