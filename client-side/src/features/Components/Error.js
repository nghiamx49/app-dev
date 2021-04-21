import React, { useContext } from "react";
import { AuthContext } from "../../Context/Auth.Context";
const Error = (props) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container" style={{ margin: "300px" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>{props.error.status}</h2>
            <div className="error-details">{props.error.mesBody}</div>
            <div className="error-actions">
              {user.role === "admin" ? (
                <a
                  href="http://localhost:3000/admin"
                  className="btn btn-primary btn-lg"
                >
                  <i className="fas fa-home"></i>
                  Take Me Home
                </a>
              ) : (
                <a
                  href="http://localhost:3000/home"
                  className="btn btn-primary btn-lg"
                >
                  <i className="fas fa-home"></i>
                  Take Me Home
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
