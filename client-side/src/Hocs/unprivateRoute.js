import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/Auth.Context";

const UnprivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          if (user.role === "admin") {
            return (
              <Redirect to={{ pathname: "/admin", state: props.location }} />
            );
          }
          return <Redirect to={{ pathname: "/home", state: props.location }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default UnprivateRoute;
