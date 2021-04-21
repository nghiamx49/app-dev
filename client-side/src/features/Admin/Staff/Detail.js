import React from "react";
import { Modal, Button } from "react-bootstrap";

const Detail = (props) => {
  const staff = props.user;

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Staff Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Staff ID:</label>&nbsp;{staff._id}
        <br />
        <label className="font-weight-bold">Username:</label>&nbsp;
        {staff.username}
        <br />
        <label className="font-weight-bold">Name:</label>&nbsp;{staff.name}
        <br />
        <label className="font-weight-bold">Role:</label>&nbsp;{staff.role}
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
