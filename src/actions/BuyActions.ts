import { BuyActionType } from './actions-types/BuyActionType';
import { IBuy } from '../models/IBuy.model';

export const buyLoading=()=>{
    return {
        type:BuyActionType.LOADING
    }
}

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