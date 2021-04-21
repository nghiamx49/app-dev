import React from "react";
import { Modal, Button } from "react-bootstrap";

const Detail = (props) => {
  const trainer = props.user;

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Trainer Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="font-weight-bold">Username:</label>&nbsp;
        {trainer.username}
        <br />
        <label className="font-weight-bold">Name:</label>&nbsp;{trainer.name}
        <br />
        <label className="font-weight-bold">Email:</label>&nbsp;{trainer.email}
        <br />
        <label className="font-weight-bold">Working Place:</label>&nbsp;
        {trainer.workingPlace}
        <br />
        <label className="font-weight-bold">Phone Number:</label>&nbsp;
        {trainer.phoneNumber}
        <br />
        <label className="font-weight-bold">Type:</label>&nbsp;{trainer.type}
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
