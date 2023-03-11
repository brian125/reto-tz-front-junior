import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "../reducers/ProductReducer";

const rootReducer=()=>{

    return combineReducers(
        {
            products:ProductReducer
        }
    )
}

export default rootReducer;