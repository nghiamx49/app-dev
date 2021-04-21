import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Create = (props) => {
  const { show, handleClose, handleChange, handleSubmit, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Trainer Account</Modal.Title>
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
          <label className="font-weight-bold">Email:</label>&nbsp;
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Working Place:</label>&nbsp;
          <input
            type="text"
            className="form-control"
            name="workingPlace"
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Phone NumBer:</label>&nbsp;
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Type:</label>&nbsp;
          <select
            className="form-control"
            name="type"
            defaultValue=""
            onChange={handleChange}
          >
            <option value="" disabled>
              Choose A Type
            </option>
            <option value="Internal Type">Internal Type</option>
            <option value="External Type">External Type</option>
          </select>
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
