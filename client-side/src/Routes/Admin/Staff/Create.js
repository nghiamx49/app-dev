import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Create = (props) => {
  const { show, handleClose, handleChange, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Staff Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form-group">
          <label className="font-weight-bold">Username:</label>&nbsp;
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Password</label>&nbsp;
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Name:</label>&nbsp;
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
          />
          <br />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Create;
