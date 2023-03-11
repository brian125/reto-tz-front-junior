import { IStateProduct } from '../models/IStateProduct.model';
import { IPaginationProduct } from '../models/IPaginationProduct.model';
import { IProduct } from '../models/IProduct.model';
import { ProductActionType } from '../actions/actions-types/ProductActionType';
import { IProductsToAdd } from '../models/IProductsToAdd.model';
import { number } from 'prop-types';

const initialState: IStateProduct = {
  isLoading: false,
  products: undefined,
  error: "",
  productsToShop: undefined
};

export type ActionType =
  | { type: "LOADING"; payload?: IPaginationProduct}
  | { type: "LOAD_SUCCESS";  payload: IPaginationProduct}
  | { type: "LOAD_FAILURE"; payload: string}
  | { type: "CREATE_PRODUCT"; payload: IProduct}
  | { type: "DELETE_PRODUCT"; payload: string}
  | { type: "ADD_PRODUCT_TO_SHOPPING"; payload: IProduct};


const ProductReducer = ( state = initialState, action: ActionType) => {
  switch (action.type) {
    case ProductActionType.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ProductActionType.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case ProductActionType.LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

      case ProductActionType.DELETE_PRODUCT:
        const product = state.products?.products?.filter(
          (product) => product.id !== action.payload
        );
        return {
          ...state,
          isLoading: false,
          error: null,
          products: { ...state.products?.products , product: product },
        };

        case ProductActionType.CREATE_PRODUCT:
        return {
          ...state,
          isLoading: false,
          error: null,
          products: { ...state.products?.products },
        };

        case ProductActionType.ADD_PRODUCT_TO_SHOPPING:
        let products: Array<IProduct> = state.productsToShop?.productsToBuy !== undefined ? state.productsToShop?.productsToBuy : [];
        products?.push(action.payload)
        const result = products.filter((value:IProduct, index: number ) => {
          return products.indexOf(value) === index
        });
        
        return {
          ...state,
          isLoading: false,
          error: null,
          productsToShop: { ...state.productsToShop, productsToBuy: result }
        };

    default:
      return state;
  }
};

export default ProductReducer;