import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/NavigationBar.css';
import AuthenticationService from '../authentication/AuthenticationService';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a:hover {
      color: black;
    }
`;

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn : ""
        };
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
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
                            {!isUserLoggedIn && <Nav.Link>><Link  className="btn btn-outline-light" to="/login">Přihlásit se</Link></Nav.Link>}
                            {isUserLoggedIn && <Nav.Link><Link  className="btn btn-outline-light" to="/logout" onClick={AuthenticationService.logout}>Odhlásit se</Link></Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }

}

export default withRouter(NavigationBar);
