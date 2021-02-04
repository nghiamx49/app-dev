import React, { useContext, useState, useEffect } from "react";
import NavBar from "../Components/Navbar";
import ContentAsTable from "../Components/ContentAsTable";
import { AuthContext } from "../../Context/Auth.Context";
import Footer from "../Components/Footer";
import AuthService from "../../Services/Auth.Service";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    setRole(user.role);
  }, []);

  console.log(trainers);

  return (
    <>
      <NavBar role={role} />
      <ContentAsTable list={[]} role={{}} />
      <Footer />
    </>
  );
};

export default Dashboard;
