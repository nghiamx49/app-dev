import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const ChangePassword = (props) => {
  const { show, handleClose, handleChange, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Trainer Account Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Old Password:</label>&nbsp;
        <input
          type="text"
          name="oldPassword"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">New Password:</label>&nbsp;
        <input
          type="text"
          name="newPassword"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Confirm Password:</label>&nbsp;
        <input
          type="text"
          name="confirmPassword"
          className="form-control"
          onChange={handleChange}
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Change Password
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default ChangePassword;
