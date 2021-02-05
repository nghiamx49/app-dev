import React, { useContext, useState, useEffect } from "react";
import NavBar from "../Components/Navbar";
import { AuthContext } from "../../Context/Auth.Context";
import SystemInfo from "../../Services/SystemInfo.Service";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { Row, Col, Card, Container } from "react-bootstrap";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [systemInfo, setSystemInfo] = useState({});
  const [role, setRole] = useState(null);

  const getSystemInfo = async () => {
    let data = await SystemInfo.forAdmin();
    setSystemInfo(data.message);
  };

  useEffect(() => {
    getSystemInfo();
    setRole(user.role);
  }, [user.role]);

  return (
    <>
      <NavBar role={role} />
      <Container>
        <div>
          <h1 className="text-center">Application Status</h1>
          <Row>
            <Col style={{ margin: "50px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Trainer</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <Card.Text>
                    Number of Trainer in system:{systemInfo.trainer};
                  </Card.Text>
                  <Link to="/admin/trainer">
                    <div className="btn btn-primary">View All Trainer</div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ margin: "50px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Staff</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <Card.Text>
                    Number of Staff in system:{systemInfo.staff};
                  </Card.Text>
                  <Link to="/admin/staff">
                    <div className="btn btn-primary">View All Staff</div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
