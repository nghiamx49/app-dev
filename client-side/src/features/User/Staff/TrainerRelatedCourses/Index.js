import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/Navbar";
import Detail from "./Detail";
import Edit from "./Edit";
import Create from "./Create";
import Delete from "./Delete";
import TrainerRelatedCourses from "../../../../Services/TrainerRelatedCourses.Service";
import { Link } from "react-router-dom";
const containerStyle = {
  margin: "100px",
};

const RelatedCourses = (props) => {
  const { userId } = useParams();
  const [detailShow, setDetailShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [newItem, setNewItem] = useState({
    courseName: "",
  });
  const [courses, setCourses] = useState([]);

  console.log(newItem);

  //HANDLE DETAIL ACTION
  const handleDetailOpen = async (itemId) => {
    await getDetail(itemId);
    setDetailShow(true);
  };

  const handleDetailClose = () => {
    setDetailShow(false);
  };

  //END HANDLE DETAIL ACTION

  const getDetail = async (itemId) => {
    let data = await TrainerRelatedCourses.getRelatedCourseDetail(
      userId,
      itemId
    );
    setActiveItem(data.message.relatedCourse);
  };

  const getRelatedCourses = async () => {
    let data = await TrainerRelatedCourses.getAllReatedCourses(userId);
    setItems(data.message.relatedCourses);
  };

  const getAllCourses = async () => {
    let data = await TrainerRelatedCourses.getDataSelection(userId);
    setCourses(data.message.courses);
  };

  //HANDLE EDIT
  const handleChange = (e) => {
    e.preventDefault();
    setActiveItem({ ...activeItem, [e.target.name]: e.target.value });
  };

  const handleEditOpen = async (itemId) => {
    await getDetail(itemId);
    setEditShow(true);
  };

  const handleEditClose = () => {
    setEditShow(false);
    getRelatedCourses();
    setMessage(null);
  };

  const handleEdit = async (itemId) => {
    try {
      if (activeItem.courseName === "") {
        setMessage({ mesBody: "Course cannot empty", mesError: true });
        return;
      }
      let res = await TrainerRelatedCourses.changeAssignedCourse(
        userId,
        itemId,
        activeItem
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
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleCreateOpen = (itemId) => {
    setCreateShow(true);
  };

  const handleCreateClose = () => {
    setCreateShow(false);
    getRelatedCourses();
    setNewItem({
      courseName: "",
    });
    setMessage(null);
  };

  const handleCreate = async () => {
    try {
      if (newItem.courseName === "") {
        setMessage({ mesBody: "Course cannot empty", mesError: true });
        return;
      }
      let res = await TrainerRelatedCourses.assignNewCourse(userId, newItem);
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
    getRelatedCourses();
    setMessage(null);
  };

  const handleDelete = async (itemId) => {
    try {
      let res = await TrainerRelatedCourses.removeAssignedCourse(
        userId,
        itemId
      );
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRelatedCourses();
    getAllCourses();
  }, []);

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold text-dark">
          Trainer Related Courses
        </h1>
        <Link to="/home/trainer" className="btn btn-secondary">
          <i className="fas fa-backward"></i> Back to Trainer Page
        </Link>
        <br />
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Course</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.courseName}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={(e) => handleDetailOpen(item._id)}
                    >
                      <i className="fas fa-info"></i>&nbsp;Detail
                    </button>
                    <Detail
                      item={activeItem}
                      show={detailShow}
                      handleClose={handleDetailClose}
                    />
                    &nbsp;
                    <button
                      className="btn btn-success"
                      onClick={(e) => handleEditOpen(item._id)}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Change Assigned
                      Course
                    </button>
                    <Edit
                      show={editShow}
                      item={activeItem}
                      courses={courses}
                      handleClose={handleEditClose}
                      handleChange={handleChange}
                      handleSubmit={(e) => handleEdit(activeItem._id)}
                      message={message}
                    />
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteOpen(item._id)}
                    >
                      <i className="fas fa-trash"></i>&nbsp;Remove Assigned
                      Course
                    </button>
                    <Delete
                      show={deleteShow}
                      item={activeItem}
                      handleClose={handleDeleteClose}
                      handleSubmit={(e) => handleDelete(activeItem._id)}
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
              Assgin New Course
            </button>
            <Create
              show={createShow}
              courses={courses}
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

export default RelatedCourses;
