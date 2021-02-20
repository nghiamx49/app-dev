import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/Auth.Context";
import AuthService from "../../Services/Auth.Service";
import { Link } from "react-router-dom";
import Edit from "./Navbar/Edit";
import Logout from "./Navbar/Logout";
import ChangePassword from "./Navbar/ChangePassword";
import ProfileService from "../../Services/Profile.Service";

const NavBar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  const [profileShow, setProfileShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [logout, setLogout] = useState();
  const [activeItem, setActiveItem] = useState({});
  const [newPass, setNewPass] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);

  const getDetail = async () => {
    let data = await ProfileService.getProfileDetail(user._id);
    setActiveItem(data.message.userInfo);
  };

  const handleLogOutOpen = () => {
    setLogout(true);
  };
  const handleLogOutClose = () => {
    setLogout(false);
  };

  const handleProfileOpen = async () => {
    await getDetail();
    setProfileShow(true);
  };
  const handleProfileClose = () => {
    setProfileShow(false);
    setMessage(null);
  };

  const handleProfileChange = (e) => {
    e.preventDefault();
    setActiveItem({ ...activeItem, [e.target.name]: e.target.value });
  };

  const handleProfilesubmit = async (e) => {
    e.preventDefault();
    let data = await ProfileService.editProfile(user._id, activeItem);
    const { message, mesError } = data;
    setMessage({ mesBody: message.mesBody, mesError: mesError });
  };

  //HANDLE CHANGE PASSWORD
  const handleChangePasswordField = (e) => {
    e.preventDefault();
    setNewPass({ ...newPass, [e.target.name]: e.target.value });
  };
  const handleChangePasswordOpen = async () => {
    setPasswordShow(true);
  };

  const handleChangepasswordClose = () => {
    setPasswordShow(false);
    setMessage(null);
    setNewPass({});
  };

  const handleChangePassword = async () => {
    try {
      if (
        !newPass.oldPassword ||
        !newPass.newPassword ||
        !newPass.confirmPassword
      ) {
        setMessage({ mesBody: "fields cannot empty", mesError: true });
        return;
      } else if (newPass.oldPassword === newPass.newPassword) {
        setMessage({
          mesBody: "new password cannot the same with old password",
          mesError: true,
        });
        return;
      } else if (newPass.newPassword !== newPass.confirmPassword) {
        setMessage({ mesBody: "confirm password is wrong", mesError: true });
        return;
      }
      let res = await ProfileService.changeProfilePassword(user._id, {
        oldPassword: newPass.oldPassword,
        newPassword: newPass.newPassword,
      });
      const { message, mesError } = res;
      setMessage({ mesBody: message.mesBody, mesError: mesError });
    } catch (error) {
      console.log(error);
    }
  };

  //END HANDLE CHANGE PASSWORD

  const checkRole = () => {
    if (props.role === "admin" || user.role === "admin") {
      return adminNav();
    }
    if (props.role === "staff" || user.role === "staff") {
      return staffNav();
    } else if (props.role === "trainer" || user.role === "trainer") {
      return trainerNav();
    } else if (props.role === "trainee" || user.role === "trainee") {
      return traineeNav();
    } else {
      return null;
    }
  };

  const adminNav = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/admin/trainer">
            <div className="nav-link">Trainer</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/staff">
            <div className="nav-link">Training's Staff</div>
          </Link>
        </li>
      </>
    );
  };

  const staffNav = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/home/trainer">
            <div className="nav-link">Trainer</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/home/trainee">
            <div className="nav-link">Trainee</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/home/courses">
            <div className="nav-link">Courses</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/home/categories">
            <div className="nav-link">Categories</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/home/requests">
            <div className="nav-link">All Requests</div>
          </Link>
        </li>
      </>
    );
  };

  const traineeNav = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/home/relatedcourses">
            <div className="nav-link">Related Courses</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/home/courses">
            <div className="nav-link">All Course</div>
          </Link>
        </li>
      </>
    );
  };

  useEffect(() => {
    getDetail();
  }, []);

  const trainerNav = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/home/relatedcourses">
            <div className="nav-link">Related Courses</div>
          </Link>
        </li>
      </>
    );
  };

  const logoutHandle = async () => {
    try {
      let res = await AuthService.logout();
      if (res.success) {
        setUser(res.user);
        setIsAuthenticated(false);
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAdmin = () => {
    if (props.role === "admin" || user.role === "admin") {
      return (
        <Link to="/admin">
          <div className="navbar-brand">TAM application</div>
        </Link>
      );
    }
    return (
      <Link to="/home">
        <div className="navbar-brand">TAM application</div>
      </Link>
    );
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark navigation-clean-button sticky-top">
      <div className="container">
        {checkAdmin()}
        <button
          data-toggle="collapse"
          data-target="#navcol-1"
          className="navbar-toggler"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarToggleExternalContent"
        >
          <ul className="nav navbar-nav mr-auto">{checkRole()}</ul>
          {!isAuthenticated ? null : (
            <span className="navbar-text actions">
              <button className="btn btn-dark" onClick={handleProfileOpen}>
                {"Hello, " + user.username}
              </button>
              <Edit
                user={activeItem}
                handleChange={handleProfileChange}
                handleSubmit={handleProfilesubmit}
                role={user.role}
                show={profileShow}
                message={message}
                handleClose={handleProfileClose}
              />
              {user.role === "admin" ? null : (
                <>
                  &nbsp; &nbsp;
                  <button
                    className="btn btn-dark"
                    onClick={handleChangePasswordOpen}
                  >
                    Change Password
                  </button>
                  <ChangePassword
                    show={passwordShow}
                    handleChange={handleChangePasswordField}
                    handleClose={handleChangepasswordClose}
                    message={message}
                    handleSubmit={() => handleChangePassword()}
                  />
                </>
              )}
              &nbsp; &nbsp;
              <button
                className="btn btn-dark action-button"
                onClick={handleLogOutOpen}
              >
                Logout
              </button>
              <Logout
                show={logout}
                handleClose={handleLogOutClose}
                handleSubmit={logoutHandle}
              />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
