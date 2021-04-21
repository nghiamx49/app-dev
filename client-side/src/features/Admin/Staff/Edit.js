import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Edit = (props) => {
  let staff = props.user;
  const { show, handleClose, handleChange, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Name:</label>&nbsp;
        <input
          type="text"
          name="name"
          className="form-control"
          value={staff.name}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Edit;
