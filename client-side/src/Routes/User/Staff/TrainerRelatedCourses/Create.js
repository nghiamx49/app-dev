import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../../Components/Message";
const Assign = (props) => {
  const {
    show,
    handleClose,
    handleChange,
    handleSubmit,
    message,
    courses,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign New Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Course:</label>&nbsp;
        <select
          className="form-control"
          name="courseName"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Choose One
          </option>
          <option disabled>Choose One</option>
          {courses.map((course) => {
            return (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            );
          })}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Assign
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Assign;
