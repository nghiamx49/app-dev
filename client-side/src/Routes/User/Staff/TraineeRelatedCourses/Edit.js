import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../../Components/Message";
const Edit = (props) => {
  const {
    item,
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
        <Modal.Title>Change Assigned Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Username:</label>&nbsp;
        <text className="form-control">{item.username}</text>
        <br />
        <label className="font-weight-bold">Course:</label>&nbsp;
        <select
          className="form-control"
          name="courseName"
          onChange={handleChange}
          defaultValue={item.courseName}
        >
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
          Save Changes
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Edit;
