import React, { useState } from "react";
import { Card, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"; // updated import
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); // useNavigate instead of useHistory

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login"); // updated from history.push to navigate
    } catch {
      setError("❌ Failed to log out");
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f1f3f5" }}
    >
      <Row className="w-100" style={{ maxWidth: "500px" }}>
        <Col>
          <Card className="shadow border-0 rounded-4">
            <Card.Body className="p-4 text-center">
              <FaUserCircle size={60} className="text-primary mb-3" />
              <h3 className="fw-bold mb-3">Your Profile</h3>
              {error && <Alert variant="danger">{error}</Alert>}

              <p className="mb-2">
                <strong>Email:</strong> <br /> {currentUser.email}
              </p>

              <Link
                to="/update-profile"
                className="btn btn-outline-primary w-100 mt-3"
              >
                Update Profile
              </Link>

              <Button
                variant="link"
                onClick={handleLogout}
                className="w-100 mt-3 text-danger text-decoration-none"
              >
                <FaSignOutAlt className="me-2" />
                Log Out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
