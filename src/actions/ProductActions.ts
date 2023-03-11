import { ProductActionType } from "./actions-types/ProductActionType"
import { IPaginationProduct } from '../models/IPaginationProduct.model';
import { IProduct } from '../models/IProduct.model';



export const productLoading=()=>{
    return {
        type:ProductActionType.LOADING
    }
}

export const productLoadSucces=(products:IPaginationProduct)=>{
    return {
        type:ProductActionType.LOAD_SUCCESS,
        payload:products
    }
}

export const productLoadError=(error:string)=>{
    return {
        type:ProductActionType.LOAD_FAILURE,
        payload:error
    }
}

export const productCreateSucces=(productToCreate:IProduct)=>{
    return {
        type:ProductActionType.CREATE_PRODUCT,
        payload:productToCreate
    }
}

export const productCreateError=(error:string)=>{
    return {
        type:ProductActionType.LOAD_FAILURE,
        payload:error
    }
}

export const productDelectSucces=(productId:string)=>{
    return {
        type:ProductActionType.DELETE_PRODUCT,
        payload:productId
    }
}

export const productDeleteError=(error:string)=>{
    return {
        type:ProductActionType.LOAD_FAILURE,
        payload:error
    }
}

export const addProductToShoppingCartSuccess=(productToAdd:IProduct)=>{
    console.log("PAYLOAD DEL ACTION", productToAdd);
    
    return {
        type:ProductActionType.ADD_PRODUCT_TO_SHOPPING,
        payload:productToAdd
    }
}