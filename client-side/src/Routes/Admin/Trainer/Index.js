import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/Navbar";
import Detail from "./Detail";
import Edit from "./Edit";
import Create from "./Create";
import Delete from "./Delete";
import ChangePassword from "./ChangePassword";
import AdminService from "../../../Services/Admin.Service";
const containerStyle = {
  margin: "100px",
};

const Trainer = (props) => {
  const [detailShow, setDetailShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeTrainer, setActiveTrainer] = useState({});
  const [newTrainer, setNewTrainer] = useState({
    username: "",
    password: "",
    name: "",
    workingPlace: "",
    phoneNumber: "",
    email: "",
    type: "",
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //HANDLE DETAIL ACTION
  const handleDetailOpen = async (trainerId) => {
    await getDetail(trainerId);
    setDetailShow(true);
  };

  const handleDetailClose = () => {
    setDetailShow(false);
  };

  //END HANDLE DETAIL ACTION

  const getDetail = async (trainerId) => {
    let data = await AdminService.trainerDetail(trainerId);
    setActiveTrainer(data.message);
  };

  const getUser = async () => {
    let response = await fetch("/admin/trainer");
    let data = await response.json();
    setTrainers(data.message.trainers);
  };

  //HANDLE EDIT
  const handleChange = (e) => {
    e.preventDefault();
    setActiveTrainer({ ...activeTrainer, [e.target.name]: e.target.value });
  };

  const handleEditOpen = async (trainerId) => {
    await getDetail(trainerId);
    setEditShow(true);
  };

  const handleEditClose = () => {
    setEditShow(false);
    getUser();
    setMessage(null);
  };

  const handleEdit = async (trainerId) => {
    try {
      if (activeTrainer.username === "") {
        setMessage({ mesBody: "username cannot empty", mesError: true });
        return;
      } else if (isNaN(activeTrainer.phoneNumber) === true) {
        setMessage({ mesBody: "phone number must be number", mesError: true });
        return;
      }
      let res = await AdminService.trainerEdit(trainerId, activeTrainer);
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };
  //END HANDLE EDIT

  //HANDLE CREATE ACTION

  const handleCreateField = (e) => {
    e.preventDefault();
    setNewTrainer({ ...newTrainer, [e.target.name]: e.target.value });
  };

  const handleCreateOpen = (trainerId) => {
    setCreateShow(true);
  };

  const handleCreateClose = () => {
    setCreateShow(false);
    getUser();
    setNewTrainer({
      username: "",
      password: "",
      name: "",
      workingPlace: "",
      phoneNumber: "",
      email: "",
      type: "",
    });
    setMessage(null);
  };

  const handleCreate = async () => {
    try {
      if (newTrainer.username === "") {
        setMessage({ mesBody: "username cannot empty", mesError: true });
        return;
      } else if (newTrainer.password === "") {
        setMessage({ mesBody: "password cannot empty", mesError: true });
        return;
      } else if (isNaN(newTrainer.phoneNumber) === true) {
        setMessage({ mesBody: "phone number must be number", mesError: true });
        return;
      } else if (
        newTrainer.type !== "External Type" &&
        newTrainer.type !== "Internal Type"
      ) {
        setMessage({ mesBody: "trainer type must be chose", mesError: true });
        return;
      }
      let res = await AdminService.trainerCreate(newTrainer);
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };
  //END HANDLE CREATE ACTION

  //HANDLE DELETE ACTION

  const handleDeleteOpen = async (userId) => {
    await getDetail(userId);
    setDeleteShow(true);
  };

  const handleDeleteClose = () => {
    setDeleteShow(false);
    getUser();
    setMessage(null);
  };

  const handleDelete = async (userId) => {
    try {
      let res = await AdminService.trainerDelete(userId);
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };

  //END HANDLE DELETE ACTION

  //HANDLE CHANGE PASSWORD ACTION
  const handleChangePasswordField = (e) => {
    e.preventDefault();
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  };

  const handleChangePasswordOpen = async (trainerId) => {
    await getDetail(trainerId);
    setPasswordShow(true);
  };

  const handleChangepasswordClose = () => {
    setPasswordShow(false);
    getUser();
    setMessage(null);
    setPasswordChange({});
  };

  const handleChangePassword = async (userId) => {
    try {
      if (
        !passwordChange.oldPassword ||
        !passwordChange.newPassword ||
        !passwordChange.confirmPassword
      ) {
        setMessage({ mesBody: "fields cannot empty", mesError: true });
        return;
      } else if (passwordChange.oldPassword === passwordChange.newPassword) {
        setMessage({
          mesBody: "new password cannot the same with old password",
          mesError: true,
        });
        return;
      } else if (
        passwordChange.newPassword !== passwordChange.confirmPassword
      ) {
        setMessage({ mesBody: "confirm password is wrong", mesError: true });
        return;
      }
      let res = await AdminService.trainerChangePass(userId, {
        oldPassword: passwordChange.oldPassword,
        newPassword: passwordChange.newPassword,
      });
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };

  //END HANDLE CHANGE PASSWORD ACTION

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold text-dark">All Trainer</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={(e) => handleDetailOpen(user._id)}
                    >
                      <i className="fas fa-info"></i>&nbsp;Detail
                    </button>
                    <Detail
                      user={activeTrainer}
                      show={detailShow}
                      handleClose={handleDetailClose}
                    />
                    &nbsp;
                    <button
                      className="btn btn-success"
                      onClick={(e) => handleEditOpen(user._id)}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </button>
                    <Edit
                      show={editShow}
                      user={activeTrainer}
                      handleClose={handleEditClose}
                      handleChange={handleChange}
                      handleSubmit={(e) => handleEdit(activeTrainer._id)}
                      message={message}
                    />
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteOpen(user._id)}
                    >
                      <i className="fas fa-trash"></i>&nbsp;Delete
                    </button>
                    <Delete
                      show={deleteShow}
                      user={activeTrainer}
                      handleClose={handleDeleteClose}
                      handleSubmit={(e) => handleDelete(activeTrainer._id)}
                      message={message}
                    />
                    &nbsp;
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleChangePasswordOpen(user._id)}
                    >
                      <i className="fas fa-key"></i>&nbsp;Change Password
                    </button>
                    <ChangePassword
                      show={passwordShow}
                      handleChange={handleChangePasswordField}
                      handleClose={handleChangepasswordClose}
                      handleSubmit={() =>
                        handleChangePassword(activeTrainer._id)
                      }
                      message={message}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-primary"
              data-toggle="modal"
              onClick={handleCreateOpen}
            >
              Create
            </button>
            <Create
              show={createShow}
              handleChange={handleCreateField}
              handleClose={handleCreateClose}
              handleSubmit={handleCreate}
              message={message}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Trainer;
