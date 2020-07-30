import React from "react";
import { Modal } from "antd";

const ModalContainer = (props) => {
  return (
    <Modal
      title={props.title}
      centered
      visible={props.visible}
      onOk={() => {
        props.setVisible(false);
        props.callback();
      }}
      onCancel={() => {
        props.setVisible(false);
      }}
    >
      <div style={{ textAlign: "center" }} />
      {props.children}
      <br />
    </Modal>
  );
};

export default ModalContainer;
