import React, { useContext, useState, useEffect } from "react";
import NavBar from "../Components/Navbar";
import { AuthContext } from "../../Context/Auth.Context";
import Footer from "../Components/Footer";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SystemInfo from "../../Services/SystemInfo.Service";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [systemInfo, setSystemInfo] = useState({});

  const [role, setRole] = useState(null);

  const getSystemInfo = async () => {
    if (user.role === "staff") {
      let data = await SystemInfo.forStaff();
      setSystemInfo(data.message);
    } else if (user.role === "trainee" || user.role === "trainer") {
      let data = await SystemInfo.forUser(user._id);
      setSystemInfo(data.message);
    } else {
      return;
    }
  };

  const body = () => {
    if (user.role === "staff") {
      return (
        <>
          <Container>
            <div>
              <h1 className="text-center">Application Status</h1>
              <Row style={{ marginBottom: "50px" }}>
                <Col style={{ margin: "50px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Trainer</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        Number of Trainer in system:{" "}
                        <strong>{systemInfo.trainers}</strong>
                      </Card.Text>
                      <Link to="/home/trainer">
                        <div className="btn btn-primary">View All Trainer</div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ margin: "50px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Trainee</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        Number of Trainee in system:
                        <strong>{systemInfo.trainees}</strong>
                      </Card.Text>
                      <Link to="/home/trainee">
                        <div className="btn btn-primary">View All Trainee</div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col style={{ margin: "50px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Courses</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        Number of Courses in system:{" "}
                        <strong>{systemInfo.courses}</strong>
                      </Card.Text>
                      <Link to="/home/courses">
                        <div className="btn btn-primary">View All Courses</div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ margin: "50px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Categories</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        Number of Categories in system:
                        <strong>{systemInfo.cateogries}</strong>
                      </Card.Text>
                      <Link to="/home/categories">
                        <div className="btn btn-primary">
                          View All Categories
                        </div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      );
    } else if (user.role === "trainee" || user.role === "trainer") {
      return (
        <>
          <Container>
            <div>
              <Row>
                <Col style={{ margin: "50px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Courses</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        Number of Courses in system:{" "}
                        <strong>{systemInfo.courses}</strong>
                      </Card.Text>
                      {user.role === "trainee" && (
                        <Link to="/home/courses">
                          <div className="btn btn-primary">
                            View All Courses
                          </div>
                        </Link>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col style={{ margin: "50px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Related Courses</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        You have <strong>{systemInfo.relatedCourses}</strong>{" "}
                        related;
                      </Card.Text>
                      <Link to="/home/relatedcourses">
                        <div className="btn btn-primary">
                          View All Related Courses
                        </div>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      );
    } else {
      return;
    }
  };

  useEffect(() => {
    setRole(user.role);
  }, [user.role]);

  return (
    <>
      <NavBar role={role} />
      {body()}
      <Footer />
    </>
  );
};

export default Dashboard;
