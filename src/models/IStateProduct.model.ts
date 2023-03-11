import { IPaginationProduct } from "./IPaginationProduct.model";
import { IProductsToAdd } from './IProductsToAdd.model';

export interface IStateProduct {
  isLoading: boolean;
  products?: IPaginationProduct;
  error: string;
  productsToShop?: IProductsToAdd
}
