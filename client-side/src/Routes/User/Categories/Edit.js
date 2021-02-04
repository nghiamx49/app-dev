import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Edit = (props) => {
  const {
    show,
    handleClose,
    handleChange,
    item,
    handleSubmit,
    message,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Category Name:</label>&nbsp;
        <input
          type="text"
          name="name"
          className="form-control"
          value={item.name}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Course Description:</label>&nbsp;
        <input
          type="text"
          name="description"
          className="form-control"
          value={item.description}
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
