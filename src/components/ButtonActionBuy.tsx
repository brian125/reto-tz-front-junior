import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { IBuy } from '../models/IBuy.model';
import { IRootReducer } from '../models/IRootReducer.model';
import { IStateProduct } from '../models/IStateProduct.model';
import { IButtonActionBuy } from '../models/IButtonActionBuy.model';

interface IPropsButton {
  data: IBuy;
  button: IButtonActionBuy;
}

const ButtonActionBuy: FC<IPropsButton> = ({ data, button }) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const { products } = useSelector<IRootReducer, IStateProduct>(
    (state) => state.products
  );

  const validateButton = (button: IButtonActionBuy) => {
    switch (button) {
      case IButtonActionBuy.VER_DETALLE:
        return setmodalOpen(true);
      default:
        return null;
    }
  };

  function getProduct(productId: string) {
    if (products) {
      const product = products.products?.find(
        (product) => product.id == productId
      );
      return product ? product.name : "No existe el producto";
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => validateButton(button)}>
        {button}
      </Button>
      <Modal
        title="DETALLES DE COMPRA"
        centered
        open={modalOpen}
        onOk={() => setmodalOpen(false)}
        onCancel={() => setmodalOpen(false)}
        okText="ENTENDIDO"
        cancelText="CERRAR"
        maskClosable={false}
      >
        <p>
          <b>Documento del cliente: </b>
          {data.idType + " " + data.id}
        </p>
        <p>
          <b>Nombre del cliente: </b>
          {data.clientName}
        </p>
        <br></br>
        <p className="center-text-modal">
          <b>PRODUCTOS</b>
        </p>
        <hr></hr>
        <br></br>
        {data?.products?.map((product) => {
          return (
            <>
              <p>
                <b>Producto: </b>
                {getProduct(product.productId)}
              </p>
              <p>
                <b>Cantidad comprada: </b>
                {product.quantity}
              </p>
              <hr></hr>
            </>
          );
        })}
        <br></br>
      </Modal>
    </>
  );
};

export default ButtonActionBuy;