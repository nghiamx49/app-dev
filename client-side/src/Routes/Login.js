import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/Auth.Context";
import AuthService from "../Services/Auth.Service";
import Message from "./Components/Message";
import "./login.css";

const Login = (props) => {
  const [user, SetUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const handleChange = async (e) => {
    try {
      await SetUser({ ...user, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (user.username === "" && user.password === "") {
        setMessage({
          mesBody: "username and password cannot empty",
          mesError: true,
        });
        return;
      }
      if (user.username === "") {
        setMessage({ mesBody: "username cannot empty", mesError: true });
        return;
      }
      if (user.password === "") {
        setMessage({ mesBody: "password cannot empty", mesError: true });
        return;
      }
      let login = await AuthService.login(user);
      const { isAuthenticated } = login;
      if (isAuthenticated) {
        authContext.setUser(login.user);
        authContext.setIsAuthenticated(isAuthenticated);
        if (login.user.role === "admin") {
          props.history.push("/admin");
        } else {
          props.history.push("/home");
        }
      } else {
        setMessage({
          mesBody: "login failed. Please check your account",
          mesError: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            <div className="card1 pb-5">
              <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                <img
                  src="https://i.imgur.com/uNGdWHi.png"
                  alt="image"
                  class="image"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div class="card2 card border-0 px-4 py-5">
              <h3 className="text-center text-dark">TAM Application</h3>
              <div className="row px-3 mb-4">
                <div className="line"></div> <div class="line"></div>
              </div>
              <div className="row px-3">
                {" "}
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Username</h6>
                </label>{" "}
                <input
                  className="mb-4"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter your username"
                />{" "}
              </div>
              <div className="row px-3">
                {" "}
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Password</h6>
                </label>{" "}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />{" "}
              </div>
              <div className="row px-3 mb-4">
                <div className="custom-control custom-checkbox custom-control-inline">
                  {" "}
                  <input
                    id="chk1"
                    type="checkbox"
                    name="chk"
                    class="custom-control-input"
                  />{" "}
                </div>{" "}
              </div>
              <div className="row mb-3 px-3">
                {" "}
                <button onClick={handleLogin} class="btn btn-blue text-center">
                  Login
                </button>{" "}
              </div>
              {message ? <Message message={message} /> : null}
              <div className="row mb-4 px-3"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
