import React, { useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import NavBar from "../../../Components/Navbar";
import Notice from "./Notice";
import RequestService from "../../../../Services/Request.Service";

const containerStyle = {
  margin: "100px",
};

const Requests = () => {
  const [allRequests, setAllRequests] = useState([]);

  const getAllRequests = async () => {
    let data = await RequestService.getAllRequest();
    const { message } = data;
    setAllRequests(message.allRequests);
  };
  const rejectReq = async (requestId) => {
    try {
      let data = await RequestService.rejectRequest(requestId);
      const { message } = data;
      getAllRequests();
    } catch (error) {
      console.log(error);
    }
  };
  const allowReq = async (requestId, obj) => {
    try {
      let data = await RequestService.allowRequest(requestId, obj);
      const { message } = data;
      getAllRequests();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);
  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <h1 className="text-center font-weight-bold text-dark">All Requests</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Course Target</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map((request) => {
              return (
                <tr key={request._id}>
                  <td>{request.username}</td>
                  <td>{request.courseName}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        allowReq(request._id, {
                          username: request.username,
                          courseName: request.courseName,
                        })
                      }
                    >
                      <i className="fas fa-check"></i>&nbsp;Allow Request
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => rejectReq(request._id)}
                    >
                      <i className="fas fa-times"></i>&nbsp;Reject Request
                    </button>
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

export default Requests;
