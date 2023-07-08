import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const TopBar = () => {
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        window.location.href = "/"; // Redirect to the home page
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
                BLOG
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" activeClassName="active">
                        HOME
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" activeClassName="active">
                        ABOUT
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" activeClassName="active">
                        CONTACT
                    </Nav.Link>
                    {user ? (
                        <>
                            <Nav.Link
                                as={Link}
                                to="/write"
                                activeClassName="active"
                            >
                                WRITE
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/settings"
                                activeClassName="active"
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link
                                as={Link}
                                to="/login"
                                activeClassName="active"
                            >
                                LOGIN
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/register"
                                activeClassName="active"
                            >
                                REGISTER
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopBar;
