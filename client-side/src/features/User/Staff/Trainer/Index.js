import React, { useContext, useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/Navbar";
import Detail from "./Detail";
import Edit from "./Edit";
import { AuthContext } from "../../../../Context/Auth.Context";
import TrainerManager from "../../../../Services/TrainerManager.Service";
import { Link } from "react-router-dom";
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
  const [trainers, setTrainers] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeTrainer, setActiveTrainer] = useState({});
  const [searchField, setSearchField] = useState(null);

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
    let data = await TrainerManager.getTrainerDetail(trainerId);
    setActiveTrainer(data.message.trainer);
  };

  const getUser = async () => {
    let data = await TrainerManager.getAllTrainer();
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
      let res = await TrainerManager.editTrainerProfile(
        trainerId,
        activeTrainer
      );
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };
  //END HANDLE EDIT

  //HANDLE SEARCH FIELD
  const handleSearchFiled = (e) => {
    e.preventDefault();
    setSearchField(e.target.value);
  };

  const handleSearch = () => {
    if (searchField === null || searchField === "") {
      return;
    }
    let result = trainers.filter((trainer) =>
      trainer.username.includes(searchField)
    );
    setTrainers(result);
  };
  const handleRefresh = () => {
    getUser();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold text-dark">All Trainer</h1>
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
                    <Link
                      className="btn btn-primary"
                      to={`/home/trainer/profile/${user._id}/relatedcourses`}
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
      </div>
      <Footer />
    </>
  );
};

export default Trainer;
