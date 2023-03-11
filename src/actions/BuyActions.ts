import { BuyActionType } from './actions-types/BuyActionType';
import { IBuy } from '../models/IBuy.model';

export const productCreateSucces=(buyToCreate:IBuy)=>{
    return {
        type:BuyActionType.CREATE_BUY,
        payload:buyToCreate
    }
}

export const productCreateError=(error:string)=>{
    return {
        type:BuyActionType.LOAD_FAILURE,
        payload:error
    }
}