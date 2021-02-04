import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Detail = (props) => {
  const { show, handleClose, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Trainer Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Do you want to delete the <strong>{props.user.username}</strong>{" "}
          account
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Detail;
