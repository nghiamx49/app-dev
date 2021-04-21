import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Edit = (props) => {
  let trainer = props.user;
  const { show, handleClose, handleChange, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Trainer Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Name:</label>&nbsp;
        <input
          type="text"
          name="name"
          className="form-control"
          value={trainer.name}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Email:</label>&nbsp;
        <input
          type="email"
          name="email"
          className="form-control"
          value={trainer.email}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Working Place:</label>&nbsp;
        <input
          type="text"
          name="workingPlace"
          className="form-control"
          value={trainer.workingPlace}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Phone NumBer:</label>&nbsp;
        <input
          type="text"
          name="phoneNumber"
          className="form-control"
          value={trainer.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Type:</label>&nbsp;
        <select
          className="form-control"
          name="type"
          onChange={handleChange}
          defaultValue={trainer.type}
        >
          <option value="Internal Type">Internal Type</option>
          <option value="External Type">External Type</option>
        </select>
        <br />
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
