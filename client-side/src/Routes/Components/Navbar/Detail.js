import React from "react";
import { Modal, Button } from "react-bootstrap";

const Detail = (props) => {
  const { user, role } = props;

  const body = () => {
    if (role === "trainee") {
      return (
        <>
          <label className="font-weight-bold">Username:</label>&nbsp;
          {user.username}
          <br />
          <label className="font-weight-bold">Name:</label>&nbsp;{user.name}
          <br />
          <label className="font-weight-bold">Day Of Birth:</label>&nbsp;
          {user.dateOfBirth}
          <br />
          <label className="font-weight-bold">Age:</label>&nbsp;{user.age}
          <br />
          <label className="font-weight-bold">Email:</label>&nbsp;
          {user.email}
          <br />
          <label className="font-weight-bold">Programming:</label>&nbsp;
          {user.programming}
          <br />
          <label className="font-weight-bold">TOEIC Score:</label>&nbsp;
          {user.TOEICScore}
          <br />
          <label className="font-weight-bold">Experiences:</label>&nbsp;
          {user.experienceDetails}
          <br />
          <label className="font-weight-bold">Department:</label>&nbsp;
          {user.department}
          <br />
        </>
      );
    } else if (role === "trainer") {
      return (
        <>
          <label className="font-weight-bold">Username:</label>&nbsp;
          {user.username}
          <br />
          <label className="font-weight-bold">Name:</label>&nbsp;{user.name}
          <br />
          <label className="font-weight-bold">Email:</label>&nbsp;
          {user.email}
          <br />
          <label className="font-weight-bold">Working Place:</label>&nbsp;
          {user.workingPlace}
          <br />
          <label className="font-weight-bold">Phone Number:</label>&nbsp;
          {user.phoneNumber}
          <br />
          <label className="font-weight-bold">Type:</label>&nbsp;{user.type}
          <br />
        </>
      );
    }
    return (
      <>
        <label className="font-weight-bold">Username:</label>&nbsp;
        {user.username}
        <br />
        <label className="font-weight-bold">Name:</label>&nbsp;{user.name}
        <br />
        <label className="font-weight-bold">Role:</label>&nbsp;{user.role}
        <br />
      </>
    );
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body()}</Modal.Body>
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
