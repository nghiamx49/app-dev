import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Create = (props) => {
  const { show, handleClose, handleChange, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Category Name:</label>&nbsp;
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Course Description:</label>&nbsp;
        <input
          type="text"
          name="description"
          className="form-control"
          onChange={handleChange}
        />
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
