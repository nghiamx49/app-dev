import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Edit = (props) => {
  const {
    show,
    handleClose,
    categories,
    handleChange,
    item,
    handleSubmit,
    message,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Course Name:</label>&nbsp;
        <input
          type="text"
          name="courseName"
          className="form-control"
          value={item.courseName}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Course Description:</label>&nbsp;
        <input
          type="text"
          name="courseDescription"
          className="form-control"
          value={item.courseDescription}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Course Cateogry:</label>&nbsp;
        <select
          name="courseCategory"
          className="form-control"
          onChange={handleChange}
          defaultValue={item.courseCategory}
        >
          {categories.map((cate) => {
            return (
              <option key={cate._id} value={cate.name}>
                {cate.name}
              </option>
            );
          })}
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
