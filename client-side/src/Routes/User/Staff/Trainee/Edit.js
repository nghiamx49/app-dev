import React from "react";
import { Modal, Button, Collapse, Card } from "react-bootstrap";
import Message from "../../../Components/Message";
const Edit = (props) => {
  let trainee = props.user;
  const {
    show,
    handleClose,
    programmings,
    handleChange,
    handleSubmit,
    message,
    isOpen,
    toggle,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Trainee Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Name:</label>&nbsp;
        <input
          type="text"
          name="name"
          className="form-control"
          value={trainee.name}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Date Of Birth:</label>&nbsp;{" "}
        <label className="form-control">{trainee.dateOfBirth}</label>
        <button className="btn btn-primary" onClick={toggle}>
          <i className="fas fa-calendar-alt"></i>
        </button>
        <Collapse in={isOpen}>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            onChange={handleChange}
          />
        </Collapse>
        <br />
        <label className="font-weight-bold">Age:</label>&nbsp;
        <input
          type="text"
          name="age"
          className="form-control"
          value={trainee.age}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Email:</label>&nbsp;
        <input
          type="email"
          name="email"
          className="form-control"
          value={trainee.email}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Programming:</label>&nbsp;
        <select
          name="programming"
          className="form-control"
          onChange={handleChange}
          defaultValue={trainee.programming}
        >
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
          value={trainee.TOEICScore}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Experience Detail:</label>&nbsp;
        <input
          type="text"
          name="experienceDetails"
          className="form-control"
          value={trainee.experienceDetails}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Department:</label>&nbsp;
        <input
          type="text"
          name="department"
          className="form-control"
          value={trainee.department}
          onChange={handleChange}
        />
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
