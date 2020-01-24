import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/NavigationBar.css';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a:hover {
      color: black;
    }
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg" className="main_navbar">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link>
                            <Link className="btn btn-outline-light" to="#">Registrace</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Link className="btn btn-outline-light" to="#">Přihlásit se</Link>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)
