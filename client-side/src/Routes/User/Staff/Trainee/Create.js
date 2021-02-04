import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../../Components/Message";
const Edit = (props) => {
  const {
    show,
    handleClose,
    programmings,
    handleChange,
    handleSubmit,
    message,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Trainee Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Username:</label>&nbsp;
        <input
          type="text"
          name="username"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Password:</label>&nbsp;
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Name:</label>&nbsp;
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Date Of Birth:</label>&nbsp;
        <input
          type="date"
          name="dateOfBirth"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Age:</label>&nbsp;
        <input
          type="text"
          name="age"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Email:</label>&nbsp;
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Programming:</label>&nbsp;
        <select
          name="programming"
          className="form-control"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Choose One
          </option>
          {programmings.map((programming) => {
            return (
              <option key={programming._id} value={programming.name}>
                {programming.name}
              </option>
            );
          })}
        </select>
        <br />
        <label className="font-weight-bold">TOEIC Score:</label>&nbsp;
        <input
          type="text"
          name="TOEICScore"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Experience Detail:</label>&nbsp;
        <input
          type="text"
          name="experienceDetails"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Department:</label>&nbsp;
        <input
          type="text"
          name="experienceDetails"
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
          Create
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Edit;
