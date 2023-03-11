import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  productLoadError,
  productLoading,
  productLoadSucces,
  productDelectSucces,
  productDeleteError,
  addProductToShoppingCartSuccess,
} from "../../actions/ProductActions";
import { TableParams } from "../../models/ITableParams.model";
import { IPaginationProduct } from "../../models/IPaginationProduct.model";
import { IProduct } from '../../models/IProduct.model';
import { productCreateSucces, productCreateError } from '../../actions/ProductActions';

export const loadAllProduct = async (dispatch: Dispatch<AnyAction>,tableParams: TableParams) => {
  const url = `http://localhost:3000/products`;
  dispatch(productLoading());
  await axios
    .get<IPaginationProduct>(url, {
      params: {
        limit: tableParams.pagination?.pageSize,
        offset: tableParams.pagination?.current && tableParams.pagination?.pageSize ?  
        (tableParams.pagination?.current - 1) * tableParams.pagination?.pageSize : 0,
      },
    })
    .then((products) => {
      dispatch(productLoadSucces(products.data));
    })
    .catch((error) => {
      dispatch(productLoadError(error.data));
    });
};

export const createProduct = async (dispatch: Dispatch<AnyAction>, productTocreate: IProduct) => {
  const url = `http://localhost:3000/products`;
  dispatch(productLoading());
  await axios.post<IProduct>(url, productTocreate).then((product) => {
    dispatch(productCreateSucces(product.data));
  }). catch((error) => {
    dispatch(productCreateError(error.data))
  })
}

export const deleteProduct = async (dispatch: Dispatch<AnyAction>,productId: string) => {
  const url = `http://localhost:3000/products/${productId}`;
  dispatch(productLoading());
  await axios
    .delete<string>(url)
    .then((products) => {
      dispatch(productDelectSucces(productId));
    })
    .catch((error) => {
      dispatch(productDeleteError(error.data));
    });
};

export const addProductToShoppingCart = (dispatch: Dispatch<AnyAction>, productToAdd: IProduct) => {
  try {
    dispatch(addProductToShoppingCartSuccess(productToAdd));
  } catch (error) {
    // dispatch(addProductToShoppingCartFailure('Error al agregar este producto al carrito de compras'))
  }
}
