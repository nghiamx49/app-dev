import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/Auth.Context";
import Error from "../Routes/Components/Error";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to={{ pathname: "/", state: props.location }} />;
        } else if (!roles.includes(user.role)) {
          return (
            <Error
              error={{
                status: "403 Unauthorized",
                mesBody: "Sorry, you don't have permisson to access this page",
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
