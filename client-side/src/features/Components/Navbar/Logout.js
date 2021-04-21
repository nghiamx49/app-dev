import React from "react";
import { Modal, Button } from "react-bootstrap";
const Logout = (props) => {
  const { show, handleClose, handleSubmit } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Logout Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Do you want to log out?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Logout;
