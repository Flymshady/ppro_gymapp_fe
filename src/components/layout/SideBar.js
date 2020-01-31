import React, {Component} from 'react';
import '../../styles/NavigationBar.css'
import {USER_NAME_SESSION_ATTRIBUTE_ROLE} from "../authentication/AuthenticationService";

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin : false
        };
    }

    componentDidMount() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if(roleName === 'Admin') {
            this.setState({isAdmin : true})
        } else {
            this.setState({isAdmin : false})
        }
    }

    render() {
        const isAdmin = this.state.isAdmin;
        return (
            <div className="sidebar">
                <a className="btn btn-outline-dark" href="/">Domovská stránka</a>
                <a className="btn btn-outline-dark" href="/ticket">Permanentky</a>
                <a className="btn btn-outline-dark" href="/course">Kurzy</a>
                <a className="btn btn-outline-dark" href="/profile">Profil</a>
                {isAdmin && <a className="btn btn-outline-dark" href="/statistics">Statistiky</a>}
            </div>
        );
    }
}

export default SideBar;
