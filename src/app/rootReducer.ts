import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "../reducers/ProductReducer";
import BuyReducer from '../reducers/BuyReducer';

const rootReducer=()=>{

    return combineReducers(
        {
            products:ProductReducer,
            buys: BuyReducer,
        }
    )
}

export default rootReducer;