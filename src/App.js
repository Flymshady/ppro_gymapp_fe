import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import TicketPage from './pages/ticket/TicketPage';
import CoursePage from './pages/course/CoursePage';
import {NoMatchPage} from './pages/NoMatchPage';
import './styles/App.css';
import NavigationBar from "./components/layout/NavigationBar";
import {Layout} from "./components/layout/Layout";
import SideBar from "./components/layout/SideBar";
import CreateTicketPage from "./pages/ticket/CreateTicketPage";
import RegisterPage from './pages/auth/RegisterPage';
import CreateRole from "./pages/user/CreateRole";
import AuthenticatedRoute from "./components/authentication/AuthenticationRoute";
import LoginPage from "./pages/auth/LoginPage";
import LogoutComponent from "./components/authentication/LogoutComponent";
import AuthRouteAdmin from "./components/authentication/AuthRouteAdmin";
import CreateCoursePage from "./pages/course/CreateCoursePage";
import CourseDetailPage from "./pages/course/CourseDetailPage";
import UpdateCoursePage from "./pages/course/UpdateCoursePage";
import UpdateRole from "./pages/user/UpdateRole";

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
                            <Route exact path="/account/create" component={RegisterPage}/>
                            <Route path="/login" component={LoginPage} />
                            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
                            <AuthenticatedRoute exact path="/ticket" component={TicketPage}/>
                            <AuthRouteAdmin  exact path="/role/create" component={CreateRole}/>
                            <AuthenticatedRoute exact path="/course" component={CoursePage}/>
                            <Route exact path="/role/update" component={UpdateRole}/>
                            <Route exact path="/course/detail/:id" component={CourseDetailPage}/>
                            <Route exact path="/course/update/:id" component={UpdateCoursePage}/>
                            <Route exact path="/course/create" component={CreateCoursePage}/>
                            <AuthenticatedRoute path="/ticket/create" component={CreateTicketPage}/>
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
