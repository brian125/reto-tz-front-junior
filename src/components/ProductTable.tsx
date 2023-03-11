import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../models/IProduct.model";
import { IRootReducer } from "../models/IRootReducer.model";
import { IStateProduct } from "../models/IStateProduct.model";
import { loadAllProduct } from "../app/middleware/payloadProducts";
import ButtonAction from "./ButtonAction";
import { IButtonAction } from "../models/IButtonAction.model";
import { Table } from "antd";
import AddProductButton from './AddProductButton';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const getParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ProductTable: React.FC = () => {
  const [data, setData] = useState<IProduct[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { products } = useSelector<IRootReducer, IStateProduct>(
    (state) => {
      return state.products
    }
  );

  useEffect(() => {
    loadAllProduct(dispatch, getParams(tableParams));
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    if (products) {
      setData(products.products);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: products?.totalElements
        },
      });
    }
  }, [products]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IProduct>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Nombre del produto",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Estado",
      dataIndex: "enabled",
      render : (bool) => bool ? 'Disponible' : 'No Disponible',
    },
    {
      title: "En Inventario",
      dataIndex: "inInventory",
    },
    {
      title: "Maximo de compra",
      dataIndex: "max",
    },
    {
      title: "Minimo de compra",
      dataIndex: "min",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <AddProductButton data={record} />
          <ButtonAction data={record} button={IButtonAction.DELETE} />
        </>
      ),
    },
  ];

  return (
    <div className="products-table">
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

export default ProductTable;
