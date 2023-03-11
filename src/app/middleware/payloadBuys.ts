import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { IBuy } from '../../models/IBuy.model';
import axios from 'axios';
import { buyCreateError, buyCreateSucces, buyLoading, buyLoadSucces, buyLoadError } from '../../actions/BuyActions';
import { TableParams } from '../../models/ITableParams.model';
import { IPaginationBuy } from '../../models/IPaginationBuy.model';


export const loadAllBuy = async (
  dispatch: Dispatch<AnyAction>,
  tableParams: TableParams
) => {
  const url = `http://localhost:3000/buys`;
  dispatch(buyLoading());

  await axios
    .get<IPaginationBuy>(url, {
      params: {
        limit: tableParams.pagination?.pageSize,
        offset: tableParams.pagination?.current && tableParams.pagination?.pageSize ?  
        (tableParams.pagination?.current - 1) * tableParams.pagination?.pageSize : 0,
      },
    })
    .then((buys) => {
      dispatch(buyLoadSucces(buys.data));
    })
    .catch((error) => {
      dispatch(buyLoadError(error.data));
    });
};

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
