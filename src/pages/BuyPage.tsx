import { TableParams } from '../models/ITableParams.model';
import { IBuy } from '../models/IBuy.model';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../models/IRootReducer.model';
import { IStateBuy } from '../models/IStateBuy.model';
import { useEffect, useState } from 'react';
import { loadAllProduct } from '../app/middleware/payloadProducts';
import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { loadAllBuy } from '../app/middleware/payloadBuys';
import ButtonActionBuy from '../components/ButtonActionBuy';
import { IButtonActionBuy } from '../models/IButtonActionBuy.model';

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const BuyPage: React.FC = () => {
  const [data, setData] = useState<IBuy[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { buys } = useSelector<IRootReducer, IStateBuy>((state) => state.buys);

  useEffect(() => {
    loadAllProduct(dispatch, getRandomuserParams(tableParams));
    loadAllBuy(dispatch, getRandomuserParams(tableParams));
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    if (buys) {
      setData(buys.buys);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: buys?.totalElements,
        },
      });
    }
  }, [buys]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IBuy>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns: ColumnsType<IBuy> = [
    {
      title: "Tipo de identidicación",
      dataIndex: "idType",
      width: "20%",
    },
    {
      title: "Identificación del cliente",
      dataIndex: "id",
      width: "20%",
    },
    {
      title: "Nombre del cliente",
      dataIndex: "clientName",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <ButtonActionBuy
            data={record}
            button={IButtonActionBuy.VER_DETALLE}
          />
        </>
      ),
    },
  ];

  return (
    <div className="home-container">
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default BuyPage;