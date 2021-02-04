import React, { useContext, useState, useEffect } from "react";
import NavBar from "../Components/Navbar";
import ContentAsTable from "../Components/ContentAsTable";
import { AuthContext } from "../../Context/Auth.Context";
import Footer from "../Components/Footer";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(user.role);
  }, []);

  return (
    <>
      <NavBar role={role} />
      <ContentAsTable />
      <Footer />
    </>
  );
};

export default Dashboard;
