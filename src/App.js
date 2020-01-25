import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import TicketPage from './pages/TicketPage';
import {CoursePage} from './pages/CoursePage';
import {NoMatchPage} from './pages/NoMatchPage';
import './styles/App.css';
import NavigationBar from "./components/layout/NavigationBar";
import {Layout} from "./components/layout/Layout";
import SideBar from "./components/layout/SideBar";
import CreateTicketPage from "./pages/CreateTicketPage";
import RegisterPage from './pages/RegisterPage';
import CreateRole from "./pages/CreateRole";
import AuthenticatedRoute from "./components/authentication/AuthenticationRoute";
import LoginPage from "./pages/LoginPage";
import LogoutComponent from "./components/authentication/LogoutComponent";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <SideBar/>
                    <NavigationBar/>
                    <div className="Main-container">
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/login" component={LoginPage} />
                            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
                            <Route exact path="/ticket" component={TicketPage}/>
                            <Route exact path="/account/create" component={RegisterPage}/>
                            <AuthenticatedRoute exact path="/role/create" component={CreateRole}/>
                            <Route path="/course" component={CoursePage}/>
                            <Route path="/ticket/create" component={CreateTicketPage}/>
                            <Route component={NoMatchPage}/>
                        </Switch>
                    </Layout>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
