import React, { useState } from "react";
import { Modal, Button } from "antd";

const ModalContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    props.callback(setLoading);
  };

  return (
    <Modal
      title={props.title}
      centered
      visible={props.visible}
      onOk={() => {
        handleOk();
      }}
      onCancel={() => {
        props.setVisible(false);
      }}
      footer={[
        <Button key="back" onClick={() => props.setVisible(false)}>
          Cancel
        </Button>,
        props.success ? (
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Generate UETNews
          </Button>
        ) : null,
      ]}
    >
      <div style={{ textAlign: "center" }} />
      {props.children}
      <br />
    </Modal>
  );
};

export default ModalContainer;
