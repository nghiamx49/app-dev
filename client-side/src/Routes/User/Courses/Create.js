import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../../Components/Message";
const Create = (props) => {
  const {
    show,
    handleClose,
    handleChange,
    categories,
    handleSubmit,
    message,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Course Name:</label>&nbsp;
        <input
          type="text"
          name="courseName"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Course Description:</label>&nbsp;
        <input
          type="text"
          name="courseDescription"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Course Cateogry:</label>&nbsp;
        <select
          className="form-control"
          name="courseCategory"
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>
            Choosen A Category
          </option>
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
          Create
        </Button>
      </Modal.Footer>
      {message ? <Message message={message} /> : null}
    </Modal>
  );
};

export default Create;
