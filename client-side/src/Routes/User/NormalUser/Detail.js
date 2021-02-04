import React from "react";
import { Modal, Button } from "react-bootstrap";

const Detail = (props) => {
  const item = props.item;

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Username:</label>&nbsp;
        {item.username}
        <br />
        <label className="font-weight-bold">Couse Name:</label>&nbsp;
        {item.courseName}
        <br />
        <label className="font-weight-bold">Description:</label>&nbsp;
        {item.courseDescription}
        <br />
        <label className="font-weight-bold">Category:</label>&nbsp;
        {item.categoryName}
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
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
