import React, { useEffect, useState, useContext } from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/Navbar";
import Detail from "./Detail";
import Edit from "./Edit";
import Create from "./Create";
import Delete from "./Delete";
import CoursesService from "../../../Services/Courses.Service";
import CategoriesService from "../../../Services/Categories.Service";
import { AuthContext } from "../../../Context/Auth.Context";
const containerStyle = {
  margin: "100px",
};
const searchStyle = {
  paddingBottom: "10px",
};

const Courses = (props) => {
  const { user } = useContext(AuthContext);
  const [detailShow, setDetailShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [newItem, setNewItem] = useState({
    courseName: "",
    courseCategory: "",
    courseDescription: "",
  });
  const [searchField, setSearchField] = useState(null);
  console.log(activeItem);
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
    let data = await CoursesService.getCourseDetail(itemId);
    setActiveItem(data.message.course);
  };

  const getAllCategories = async () => {
    let data = await CategoriesService.getAllCategories();
    setCategories(data.message.categories);
  };

  const getAllCourses = async () => {
    let data = await CoursesService.getAllCourses();
    setItems(data.message.courses);
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
    getAllCourses();
    setMessage(null);
  };

  const handleEdit = async (itemId) => {
    try {
      if (activeItem.courseName === "") {
        setMessage({ mesBody: "Course Name cannot empty", mesError: true });
        return;
      } else if (activeItem.courseCategory === "") {
        setMessage({ mesBody: "Category cannot empty", mesError: true });
        return;
      }
      let res = await CoursesService.editCourse(itemId, activeItem);
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

  const handleCreateOpen = () => {
    setCreateShow(true);
  };

  const handleCreateClose = () => {
    setCreateShow(false);
    getAllCourses();
    setNewItem({
      courseName: "",
      courseCategory: "",
      courseDescription: "",
    });
    setMessage(null);
  };

  const handleCreate = async () => {
    try {
      if (newItem.courseName === "") {
        setMessage({ mesBody: "Course Name cannot empty", mesError: true });
        return;
      } else if (newItem.courseCategory === "") {
        setMessage({ mesBody: "Category cannot empty", mesError: true });
        return;
      }
      let res = await CoursesService.createCourse(newItem);
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };
  //END HANDLE CREATE ACTION

  //HANDLE DELETE ACTION

  const handleDeleteOpen = async (itemId) => {
    await getDetail(itemId);
    setDeleteShow(true);
  };

  const handleDeleteClose = () => {
    setDeleteShow(false);
    getAllCourses();
    setMessage(null);
  };

  const handleDelete = async (courseId) => {
    try {
      let res = await CoursesService.deleteCourse(courseId);
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchFiled = (e) => {
    e.preventDefault();
    setSearchField(e.target.value);
  };

  const handleSearch = () => {
    if (searchField === null || searchField === "") {
      return;
    }
    let result = items.filter((item) => item.courseName.includes(searchField));
    setItems(result);
  };
  const handleRefresh = () => {
    getAllCourses();
  };

  useEffect(() => {
    getAllCourses();
    getAllCategories();
  }, []);

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold text-dark">All Courses</h1>
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
              <th scope="col">Course</th>
              <th scope="col">Category</th>
              {user.role === "staff" ? <th scope="col">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {items.map((course) => {
              return (
                <tr key={course._id}>
                  <td>{course.courseName}</td>
                  <td>{course.courseCategory}</td>
                  {user.role === "staff" ? (
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={(e) => handleDetailOpen(course._id)}
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
                        onClick={(e) => handleEditOpen(course._id)}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </button>
                      <Edit
                        show={editShow}
                        item={activeItem}
                        categories={categories}
                        handleClose={handleEditClose}
                        handleChange={handleChange}
                        handleSubmit={(e) => handleEdit(activeItem._id)}
                        message={message}
                      />
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDeleteOpen(course._id)}
                      >
                        <i className="fas fa-trash"></i>&nbsp;Delete
                      </button>
                      <Delete
                        show={deleteShow}
                        item={activeItem}
                        handleClose={handleDeleteClose}
                        handleSubmit={(e) => handleDelete(activeItem._id)}
                        message={message}
                      />
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
        {user.role === "staff" && (
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
                categories={categories}
                handleChange={handleCreateField}
                handleClose={handleCreateClose}
                handleSubmit={handleCreate}
                message={message}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Courses;
