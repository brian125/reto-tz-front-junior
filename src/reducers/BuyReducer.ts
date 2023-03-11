import { IBuy } from '../models/IBuy.model';
import { BuyActionType } from '../actions/actions-types/BuyActionType';
import { IStateBuy } from '../models/IStateBuy.model';
import { IPaginationBuy } from '../models/IPaginationBuy.model';

const initialState: IStateBuy = {
  isLoading: false,
  buys: undefined,
  error: "",
};

export type ActionType =
  | { type: "LOADING"; payload: IPaginationBuy }
  | { type: "LOAD_SUCCESS"; payload: IPaginationBuy }
  | { type: "LOAD_FAILURE"; payload: string }
  | { type: "CREATE_BUY"; payload: IBuy };

const BuyReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    
    case BuyActionType.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case BuyActionType.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        buys: action.payload,
      };
    
    case BuyActionType.LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case BuyActionType.CREATE_BUY:
      return {
        ...state,
        isLoading: false,
        error: null,
        buys: { ...state.buys },
      };

    default:
      return state;
  }
};

export default BuyReducer;
