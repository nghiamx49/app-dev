import React, { useEffect, useState, useContext } from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/Navbar";
import Detail from "./Detail";
import ProfileService from "../../../Services/Profile.Service";
import { AuthContext } from "../../../Context/Auth.Context";
const containerStyle = {
  margin: "100px",
};

const RelatedCourses = () => {
  const { user } = useContext(AuthContext);
  const [detailShow, setDetailShow] = useState(false);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});

  //HANDLE DETAIL ACTION
  const handleDetailOpen = async (itemId) => {
    await getDetail(itemId);
    setDetailShow(true);
  };

  const handleDetailClose = () => {
    setDetailShow(false);
    getRelatedCourses();
  };

  //END HANDLE DETAIL ACTION

  const getDetail = async (itemId) => {
    try {
      let data = await ProfileService.getDetailOwnRelatedCourse(
        user._id,
        itemId
      );
      setActiveItem(data.message.relatedCourse);
    } catch (error) {
      alert(error);
    }
  };

  const getRelatedCourses = async () => {
    let data = await ProfileService.getOwnRelatedCourses(user._id);
    setItems(data.message.relatedCourses);
  };

  useEffect(() => {
    getRelatedCourses();
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
              <th scope="col">Course Name</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((relatedCourse) => {
              return (
                <tr key={relatedCourse._id}>
                  <td>{relatedCourse.username}</td>
                  <td>{relatedCourse.courseName}</td>
                  <td>{relatedCourse.categoryName}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={(e) => handleDetailOpen(relatedCourse._id)}
                    >
                      <i className="fas fa-info"></i>&nbsp;Detail
                    </button>
                    <Detail
                      item={activeItem}
                      show={detailShow}
                      handleClose={handleDetailClose}
                    />
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

export default RelatedCourses;
