import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Menubar() {
  const logout = useLogout();
  const [isAdmin, setIsAdmin] = useState(false); // Use a boolean state instead of a flag
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const decoded = jwtDecode(token);
    setIsAdmin(decoded.role === "admin"); // Simplify the logic using a boolean value
  }, [token]);

  // Create a reusable Navbar component
  function renderNavbar(links) {
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Waste Management System</Navbar.Brand>
          <Nav className="me-auto">{links}</Nav>
        </Container>
      </Navbar>
    );
  }

  // Render links based on user role
  const links = isAdmin ? (
    <>
      <Link to="/dashboard" className="nav-link">
        Dashboard
      </Link>
      <Link to="/create-user" className="nav-link">
        Create User
      </Link>
      <Link to="/users/bins" className="nav-link">
        Lists Bins
      </Link>
      <Link to="/users/create-bin" className="nav-link">
        Create Bin
      </Link>
      <Button variant="danger" onClick={logout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button variant="danger" onClick={logout}>
        Logout
      </Button>
    </>
  );

  return <div>{renderNavbar(links)}</div>;
}

export default Menubar;
