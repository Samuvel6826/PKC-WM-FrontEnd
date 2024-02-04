import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Menubar() {
  const logout = useLogout();
  const [isAdmin, setIsAdmin] = useState(false);
  const token = sessionStorage.getItem("token");

  // Use the `useEffect` hook to update isAdmin based on token changes
  useEffect(() => {
    // Check if token exists before decoding
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === "admin");
    }
  }, [token]);

  // Simplify the rendering of the Navbar
  const renderNavbar = (links) => (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Waste Management System
        </Navbar.Brand>
        <Nav className="me-auto">{links}</Nav>
      </Container>
    </Navbar>
  );

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
    <Button variant="danger" onClick={logout}>
      Logout
    </Button>
  );

  return <div>{renderNavbar(links)}</div>;
}

export default Menubar;
