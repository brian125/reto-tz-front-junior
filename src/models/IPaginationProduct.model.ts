import { IProduct } from "./IProduct.model";

export interface IPaginationProduct {
  products?: IProduct[];
  totalElements: number
}
