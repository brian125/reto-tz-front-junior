import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Badge } from "antd";
import Form from "antd/es/form/Form";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ProductTable from "../components/ProductTable";
import { IProduct } from "../models/IProduct.model";
import { createProduct } from "../app/middleware/payloadProducts";
import { useDispatch, useSelector } from "react-redux";
import { IBuy } from "../models/IBuy.model";
import { IRootReducer } from "../models/IRootReducer.model";
import { IStateProduct } from "../models/IStateProduct.model";

const HomePage: React.FC = () => {
  const [visible, setVisible] = useState(false); // PARA EL DEL PRODUCTO
  const [open, setOpen] = useState(false); // PARA EL DE LAS COMPRAS
  const [form] = Form.useForm();
  const [formDoBuy] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const dispatch = useDispatch();
  const handleSubmit = (values: IProduct) => {
    console.log(values);
    values.inInventory > 0 ? (values.enabled = true) : (values.enabled = false);
    createProduct(dispatch, values);

    setVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSubmitBuy = (values: IBuy) => {
    console.log("Los valores de la compra", values);
    createBuy(dispatch, values);

    setOpen(false);
    form.resetFields();
  };

  const handleCancelBuy = () => {
    setOpen(false);
    form.resetFields();
  };

  const state = useSelector<IRootReducer, IStateProduct>((state) => {
    return state.products;
  });

  return (
    <div className="products-container">
      <h2 className="products-title">Productos</h2>
      <div className="filtered-buttons">
        <Button type="primary" onClick={showModal}>
          Agregar producto
        </Button>
        <Badge count={state.productsToShop?.productsToBuy.length}>
          <Button onClick={() => setOpen(true)}>
            <ShoppingCartOutlined />
            Realizar compra
          </Button>
        </Badge>
      </div>
      <Modal
        title="Agregar Producto"
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        width={700}
        maskClosable={false}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 650 }}
          onFinish={handleSubmit}
          onFinishFailed={handleCancel}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre del producto"
            name="name"
            preserve
            rules={[
              {
                required: true,
                message: "Por favor agrega el nombre del producto",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Cantidad en inventario"
            name="inInventory"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Por favor ingresa la cantidad del producto en inventario",
              },
            ]}
          >
            <InputNumber style={{ width: 433 }} />
          </Form.Item>

          <Form.Item
            label="Cantidad minima de compra"
            name="min"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Por favor ingresa la cantidad del producto en inventario",
              },
            ]}
          >
            <InputNumber style={{ width: 433 }} />
          </Form.Item>

          <Form.Item
            label="Cantidad maxima de compra"
            name="max"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Por favor ingresa la cantidad del producto en inventario",
              },
            ]}
          >
            <InputNumber style={{ width: 433 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL HACER COMPRAS */}
      <Modal
        title="Realizar Compra"
        open={open}
        onOk={formDoBuy.submit}
        onCancel={handleCancelBuy}
        width={700}
        maskClosable={false}
      >
        <Form
          form={formDoBuy}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 650 }}
          onFinish={handleSubmitBuy}
          onFinishFailed={handleCancelBuy}
          autoComplete="off"
        >
          <Form.Item
            label="Tipo de documento"
            name="idType"
            preserve
            rules={[
              {
                required: true,
                message:
                  "Ingrese el tipo de documento Ejemplo: 'Cedula' - 'Tarjeta identidad'",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Documento de identidad"
            name="id"
            preserve
            rules={[
              {
                required: true,
                message: "Por favor ingrese el número de identificación",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nombre del comprador"
            name="clientName"
            preserve
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {state.productsToShop?.productsToBuy !== undefined ? (
            state.productsToShop?.productsToBuy.map((product) => {
              return (
                <div>
                  <hr />
                  <h3>{product.name}</h3>
                  <Form.Item
                    label="Cantidad"
                    name={[product.id, 'quantity']}
                    preserve
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese cantidad a comprar",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                </div>
              );
            })
          ) : (
            <div>
              <hr />
              <h3>No tienes productos por comprar</h3>
            </div>
          )}
        </Form>
      </Modal>

      <ProductTable />
    </div>
  );
};

export default HomePage;
