import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { IBuy } from '../../models/IBuy.model';
import axios from 'axios';
import { buyCreateError, buyCreateSucces, buyLoading } from '../../actions/BuyActions';

export const createBuy = async (dispatch: Dispatch<AnyAction>, buyToCreate: any) => {
  console.log("OBJETO PARA COMPRAR", buyToCreate);
    const url = `http://localhost:3000/buys`;
  dispatch(buyLoading());
  await axios.post<IBuy>(url, buyToCreate).then((buy) => {
    dispatch(buyCreateSucces(buy.data));
  }). catch((error) => {
    dispatch(buyCreateError(error.data))
  })
}
