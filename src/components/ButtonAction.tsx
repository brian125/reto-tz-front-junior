import { IProduct } from '../models/IProduct.model';
import { IButtonAction } from '../models/IButtonAction.model';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../app/middleware/payloadProducts';
import { Button } from 'antd';

interface IPropsButton {
  data: IProduct;
  button: IButtonAction;
}

const ButtonAction: FC<IPropsButton> = ({ data, button }) => {

    const dispatch = useDispatch();

  const validateButton = (button: IButtonAction) => {
    switch (button) {
      case IButtonAction.DELETE:
        return deleteProduct(dispatch,data.id);
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => validateButton(button)}>
        {button}
      </Button>
    </>
  );
};

export default ButtonAction;