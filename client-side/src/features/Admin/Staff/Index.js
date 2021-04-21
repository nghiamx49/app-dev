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
  const [staffs, setStaff] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeStaff, setactiveStaff] = useState({});
  const [newStaff, setnewStaff] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //HANDLE DETAIL ACTION
  const handleDetailOpen = async (staffId) => {
    await getDetail(staffId);
    setDetailShow(true);
  };

  const handleDetailClose = () => {
    setDetailShow(false);
  };

  //END HANDLE DETAIL ACTION

  const getDetail = async (staffId) => {
    let data = await AdminService.staffDetail(staffId);
    setactiveStaff(data.message);
  };

  const getUser = async () => {
    let data = await AdminService.allStaff();
    setStaff(data.message.staffs);
  };

  //HANDLE EDIT
  const handleChange = (e) => {
    e.preventDefault();
    setactiveStaff({ ...activeStaff, [e.target.name]: e.target.value });
  };

  const handleEditOpen = async (staffId) => {
    await getDetail(staffId);
    setEditShow(true);
  };

  const handleEditClose = () => {
    setEditShow(false);
    getUser();
    setMessage(null);
  };

  const handleEdit = async (staffId) => {
    try {
      if (activeStaff.username === "") {
        setMessage({ mesBody: "Username cannot empty", mesError: true });
        return;
      } else if (activeStaff.name === "") {
        setMessage({ mesBody: "Name cannot empty", mesError: true });
        return;
      }
      let res = await AdminService.staffEdit(staffId, activeStaff);
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
    setnewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleCreateOpen = (staffId) => {
    setCreateShow(true);
  };

  const handleCreateClose = () => {
    setCreateShow(false);
    getUser();
    setnewStaff({
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
      if (newStaff.username === "") {
        setMessage({ mesBody: "Username cannot empty", mesError: true });
        return;
      } else if (newStaff.password === "") {
        setMessage({ mesBody: "Password cannot empty", mesError: true });
        return;
      } else if (newStaff.name === "") {
        setMessage({ mesBody: "Name cannot empty", mesError: true });
        return;
      }
      let res = await AdminService.staffCreate(newStaff);
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
      let res = await AdminService.staffDelete(userId);
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

  const handleChangePasswordOpen = async (staffId) => {
    await getDetail(staffId);
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
      let res = await AdminService.staffChangePass(userId, {
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
        <h1 className="text-center font-weight-bold text-dark">
          All Training's Staff
        </h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((user) => {
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
                      user={activeStaff}
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
                      user={activeStaff}
                      handleClose={handleEditClose}
                      handleChange={handleChange}
                      handleSubmit={(e) => handleEdit(activeStaff._id)}
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
                      user={activeStaff}
                      handleClose={handleDeleteClose}
                      handleSubmit={(e) => handleDelete(activeStaff._id)}
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
                      handleSubmit={() => handleChangePassword(activeStaff._id)}
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
