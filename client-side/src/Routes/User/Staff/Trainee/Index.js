import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/Navbar";
import Detail from "./Detail";
import Edit from "./Edit";
import Create from "./Create";
import Delete from "./Delete";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../../../../Context/Auth.Context";
import TraineeManagerService from "../../../../Services/TraineeManager.Service";
const containerStyle = {
  margin: "100px",
};
const searchStyle = {
  paddingBottom: "10px",
};

const Trainer = (props) => {
  const { user } = useContext(AuthContext);
  const [detailShow, setDetailShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [trainees, setTrainees] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeTrainee, setactiveTrainee] = useState({});
  const [newTrainee, setNewTrainee] = useState({
    dateOfBirth: "",
    age: "",
    email: "",
    educatation: "",
    programming: "",
    TOEICScore: "",
    experienceDetails: "",
    department: "",
    name: "",
    username: "",
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [programmings, setProgrammings] = useState([]);
  const [searchField, setSearchField] = useState(null);
  //HANDLE DETAIL ACTION
  const handleDetailOpen = async (traineeId) => {
    await getDetail(traineeId);
    setDetailShow(true);
  };

  const handleDetailClose = () => {
    setDetailShow(false);
  };

  //END HANDLE DETAIL ACTION

  const getDetail = async (traineeId) => {
    let data = await TraineeManagerService.getTraineeDetail(traineeId);
    setactiveTrainee(data.message.trainee);
  };

  const getUser = async () => {
    let data = await TraineeManagerService.getAllTrainee();
    setTrainees(data.message.trainees);
  };

  //HANDLE EDIT
  const handleChange = (e) => {
    e.preventDefault();
    setactiveTrainee({ ...activeTrainee, [e.target.name]: e.target.value });
  };

  const handleEditOpen = async (traineeId) => {
    await getDetail(traineeId);
    setEditShow(true);
  };

  const handleEditClose = () => {
    setEditShow(false);
    getUser();
    setMessage(null);
  };

  const handleEdit = async (traineeId) => {
    try {
      if (activeTrainee.username === "") {
        setMessage({ mesBody: "username cannot empty", mesError: true });
        return;
      } else if (isNaN(activeTrainee.age) === true) {
        setMessage({ mesBody: "Age must be number", mesError: true });
        return;
      }
      let res = await TraineeManagerService.editTraineeAccount(
        traineeId,
        activeTrainee
      );
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
    setNewTrainee({ ...newTrainee, [e.target.name]: e.target.value });
  };

  const handleCreateOpen = (traineeId) => {
    setCreateShow(true);
  };

  const handleCreateClose = () => {
    setCreateShow(false);
    getUser();
    setNewTrainee({
      dateOfBirth: "",
      age: "",
      email: "",
      educatation: "",
      programming: "",
      TOEICScore: "",
      experienceDetails: "",
      department: "",
      name: "",
      username: "",
    });
    setMessage(null);
  };

  const handleCreate = async () => {
    try {
      if (newTrainee.username === "") {
        setMessage({ mesBody: "username cannot empty", mesError: true });
        return;
      } else if (newTrainee.password === "") {
        setMessage({ mesBody: "password cannot empty", mesError: true });
        return;
      } else if (isNaN(newTrainee.age) === true) {
        setMessage({ mesBody: "age number must be number", mesError: true });
        return;
      } else if (newTrainee.programming === "") {
        setMessage({
          mesBody: "programming language must be chose",
          mesError: true,
        });
        return;
      }
      let res = await TraineeManagerService.createNewTrainee(newTrainee);
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };
  //END HANDLE CREATE ACTION

  //HANDLE DELETE ACTION

  const handleDeleteOpen = async (traineeId) => {
    await getDetail(traineeId);
    setDeleteShow(true);
  };

  const handleDeleteClose = () => {
    setDeleteShow(false);
    getUser();
    setMessage(null);
  };

  const handleDelete = async (traineeId) => {
    try {
      let res = await TraineeManagerService.deleteTraineeAccount(traineeId);
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

  const handleChangePasswordOpen = async (traineeId) => {
    await getDetail(traineeId);
    setPasswordShow(true);
  };

  const handleChangepasswordClose = () => {
    setPasswordShow(false);
    getUser();
    setMessage(null);
    setPasswordChange({});
  };

  const handleChangePassword = async (traineeId) => {
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
      let res = await TraineeManagerService.changeTraineePassword(traineeId, {
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
  //HANDLE SEARCH FIELD
  const handleSearchFiled = (e) => {
    e.preventDefault();
    setSearchField(e.target.value);
  };

  const handleSearch = () => {
    if (searchField === null || searchField === "") {
      return;
    }
    let result = trainees.filter((trainer) =>
      trainer.username.includes(searchField)
    );
    setTrainees(result);
  };
  const handleRefresh = () => {
    getUser();
  };

  const getProgramming = async () => {
    let data = await TraineeManagerService.getOptional();
    setProgrammings(data.message.programmings);
  };

  useEffect(() => {
    getUser();
    getProgramming();
  }, []);

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold text-dark">All Trainee</h1>
        {user.role === "staff" ? (
          <div className="input-group" style={searchStyle}>
            <div>
              <input
                type="search"
                id="form1"
                name="searchField"
                className="form-control"
                onChange={handleSearchFiled}
                placeholder="search"
              />
            </div>
            &nbsp;
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              <i className="fas fa-search"></i>
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRefresh}
            >
              <i className="fas fa-redo"></i>
            </button>
          </div>
        ) : null}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Name</th>
              <th scope="col">Programming Language</th>
              <th scope="col">TOEIC Score</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainees.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.programming}</td>
                  <td>{user.TOEICScore}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={(e) => handleDetailOpen(user._id)}
                    >
                      <i className="fas fa-info"></i>&nbsp;Detail
                    </button>
                    <Detail
                      user={activeTrainee}
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
                      programmings={programmings}
                      user={activeTrainee}
                      handleClose={handleEditClose}
                      handleChange={handleChange}
                      handleSubmit={(e) => handleEdit(activeTrainee._id)}
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
                      user={activeTrainee}
                      handleClose={handleDeleteClose}
                      handleSubmit={(e) => handleDelete(activeTrainee._id)}
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
                        handleChangePassword(activeTrainee._id)
                      }
                      message={message}
                    />
                    &nbsp;
                    <Link
                      className="btn btn-primary"
                      to={`/home/trainee/profile/${user._id}/relatedcourses`}
                    >
                      <i className="fas fa-angle-double-right"></i>&nbsp;Related
                      Courses
                    </Link>
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
              programmings={programmings}
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
