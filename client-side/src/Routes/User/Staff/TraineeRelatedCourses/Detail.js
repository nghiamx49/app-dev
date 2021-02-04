import React from "react";
import { Modal, Button } from "react-bootstrap";

const Detail = (props) => {
  const { item, handleClose, show } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assigned Course Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Username:</label>&nbsp;
        {item.username}
        <br />
        <label className="font-weight-bold">Course:</label>&nbsp;
        {item.courseName}
        <br />
        <label className="font-weight-bold">Category:</label>&nbsp;
        {item.categoryName}
        <br />
        <label className="font-weight-bold">Description:</label>&nbsp;
        {item.courseDescription}
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default Detail;
