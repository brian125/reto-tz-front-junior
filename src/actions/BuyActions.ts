import { BuyActionType } from './actions-types/BuyActionType';
import { IBuy } from '../models/IBuy.model';
import { IPaginationBuy } from '../models/IPaginationBuy.model';

export const buyLoading=()=>{
    return {
        type:BuyActionType.LOADING
    }
}

export const buyLoadSucces = (buys: IPaginationBuy) => {
    return {
      type: BuyActionType.LOAD_SUCCESS,
      payload: buys,
    };
  };
  
  export const buyLoadError = (error: string) => {
    return {
      type: BuyActionType.LOAD_FAILURE,
      payload: error,
    };
  };

export const buyCreateSucces=(buyToCreate:IBuy)=>{
    return {
        type:BuyActionType.CREATE_BUY,
        payload:buyToCreate
    }
}

export const buyCreateError=(error:string)=>{
    return {
        type:BuyActionType.LOAD_FAILURE,
        payload:error
    }
}