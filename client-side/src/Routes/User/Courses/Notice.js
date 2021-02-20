import React from "react";
import { Modal } from "react-bootstrap";
import Message from "../../Components/Message";
const Detail = (props) => {
  const { show, handleClose, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message ? <Message message={message} /> : null}</Modal.Body>
    </Modal>
  );
};

export default Detail;
