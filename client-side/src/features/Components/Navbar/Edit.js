import React from "react";
import { Modal, Button } from "react-bootstrap";
import Message from "../Message";

const Detail = (props) => {
  const {
    user,
    role,
    handleChange,
    message,
    handleSubmit,
    handleClose,
  } = props;

  const body = () => {
    if (role === "trainee") {
      return (
        <>
          <label className="font-weight-bold">Username:</label>&nbsp;
          <input
            className="form-control"
            name="username"
            value={user.username}
            disabled={true}
          />
          <br />
          <label className="font-weight-bold">Name:</label>&nbsp;
          <input
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Day Of Birth:</label>&nbsp;
          <input
            className="form-control"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Age:</label>&nbsp;
          <input
            className="form-control"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Email:</label>&nbsp;
          <input
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Programming:</label>&nbsp;
          <input
            className="form-control"
            name="programming"
            value={user.programming}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">TOEIC Score:</label>&nbsp;
          <input
            className="form-control"
            name="TOEICScore"
            value={user.TOEICScore}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Experiences:</label>&nbsp;
          <input
            className="form-control"
            name="experienceDetails"
            value={user.experienceDetails}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Department:</label>&nbsp;
          <input
            className="form-control"
            name="department"
            value={user.department}
            onChange={handleChange}
          />
          <br />
        </>
      );
    } else if (role === "trainer") {
      return (
        <>
          <label className="font-weight-bold">Username:</label>&nbsp;
          <input
            className="form-control"
            name="username"
            value={user.username}
            disabled={true}
          />
          <br />
          <label className="font-weight-bold">Name:</label>&nbsp;
          <input
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Email:</label>&nbsp;
          <input
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Working Place:</label>&nbsp;
          <input
            className="form-control"
            name="workingPlace"
            value={user.workingPlace}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Phone Number:</label>&nbsp;
          <input
            className="form-control"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
          <br />
          <label className="font-weight-bold">Type:</label>&nbsp;
          <input
            className="form-control"
            name="type"
            value={user.type}
            onChange={handleChange}
          />
          <br />
        </>
      );
    }
    return (
      <>
        <label className="font-weight-bold">Username:</label>&nbsp;
        <input
          className="form-control"
          name="username"
          value={user.username}
          disabled={true}
        />
        <br />
        <label className="font-weight-bold">Name:</label>&nbsp;
        <input
          className="form-control"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <br />
        <label className="font-weight-bold">Role:</label>&nbsp;
        <input
          className="form-control"
          name="role"
          value={user.role}
          disabled={true}
        />
        <br />
      </>
    );
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body()}</Modal.Body>
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

export default Detail;
