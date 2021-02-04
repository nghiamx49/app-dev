import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../../Components/Message";
const Detail = (props) => {
  const { show, handleClose, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Assigned Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Do you want to remove the <strong>{props.item.courseName}</strong>{" "}
          from this account
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Remove
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Detail;
