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
        <label className="font-weight-bold">Category ID:</label>&nbsp;
        {item._id}
        <br />
        <label className="font-weight-bold">Catgory Name:</label>&nbsp;
        {item.name}
        <br />
        <label className="font-weight-bold">Category Description:</label>&nbsp;
        {item.description}
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
