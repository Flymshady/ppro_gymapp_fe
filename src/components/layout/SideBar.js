import React, {Component} from 'react';
import '../../styles/NavigationBar.css'

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <a className="btn btn-outline-dark" href="/">Domovská stránka</a>
                <a className="btn btn-outline-dark" href="/ticket">Permanentky</a>
                <a className="btn btn-outline-dark" href="/course">Kurzy</a>
                <a className="btn btn-outline-dark" href="/profile">Profil</a>
            </div>
        );
    }
}

export default SideBar;
