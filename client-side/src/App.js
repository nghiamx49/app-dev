import React from "react";
import Login from "./Routes/Login";
import PrivateRoute from "./Hocs/privateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Routes/Admin/Dashboard";
import Home from "./Routes/User/Home";
import TrainerInAdmin from "./Routes/Admin/Trainer/Index";
import StaffInAdmin from "./Routes/Admin/Staff/Index";
import RelatedCourses from "./Routes/User/NormalUser/Index";
import Courses from "./Routes/User/Courses/Index";
import Categories from "./Routes/User/Categories/Index";
import TrainerInStaff from "./Routes/User/Staff/Trainer/Index";
import TraineeInStaff from "./Routes/User/Staff/Trainee/Index";
import UnprivateRoute from "./Hocs/unprivateRoute";
import NotFound from "./Routes/Components/NotFound";
import TrainerRelatedCourses from "./Routes/User/Staff/TrainerRelatedCourses/Index";
import TraineeRelatedCourses from "./Routes/User/Staff/TraineeRelatedCourses/Index";
function App() {
  return (
    <Router>
      <Switch>
        <UnprivateRoute path="/" component={Login} exact />
        <PrivateRoute
          path="/admin"
          roles={["admin"]}
          component={Dashboard}
          exact
        />
        <PrivateRoute
          path="/home"
          roles={["staff", "trainer", "trainee"]}
          component={Home}
          exact
        />
        <PrivateRoute
          path="/admin/trainer"
          roles={["admin"]}
          component={TrainerInAdmin}
          exact
        />
        <PrivateRoute
          path="/admin/staff"
          roles={["admin"]}
          component={StaffInAdmin}
          exact
        />
        <PrivateRoute
          path="/home/relatedcourses"
          roles={["trainer", "trainee"]}
          component={RelatedCourses}
          exact
        />
        <PrivateRoute
          path="/home/courses"
          roles={["staff", "trainee"]}
          component={Courses}
          exact
        />
        <PrivateRoute
          path="/home/categories"
          roles={["staff"]}
          component={Categories}
          exact
        />
        <PrivateRoute
          path="/home/trainer"
          roles={["staff"]}
          component={TrainerInStaff}
          exact
        />
        <PrivateRoute
          path="/home/trainee"
          roles={["staff"]}
          component={TraineeInStaff}
          exact
        />
        <PrivateRoute
          path="/home/trainer/profile/:userId/relatedcourses"
          roles={["staff"]}
          component={TrainerRelatedCourses}
          exact
        />
        <PrivateRoute
          path="/home/trainee/profile/:userId/relatedcourses"
          roles={["staff"]}
          component={TraineeRelatedCourses}
          exact
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
