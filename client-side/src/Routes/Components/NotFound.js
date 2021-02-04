import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.Context";
const Error = (props) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();
  return (
    <div className="container" style={{ margin: "300px" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">This url <strong>{location.pathname}</strong> is invalid</div>
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
