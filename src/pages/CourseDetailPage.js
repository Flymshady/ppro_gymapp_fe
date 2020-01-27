import React, {Component} from 'react';
import '../styles/Table.css';
import {getCourseDetailUrl} from "../constants";

class CourseDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseData: [],
            loading: true,
            trainer: {},
            accountSignedCourses: []
        };
    }

    componentDidMount() {
        console.log("ID: " + this.props.match.params.id)

        fetch(getCourseDetailUrl + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({courseData: jsonResponse, loading: false})
                this.setState({trainer: jsonResponse.trainer})
                this.setState({accountSignedCourses: jsonResponse.accountSignedCourses})
            }).catch((err) => console.error(err));
    }

    render() {
        const coursesData = this.state.courseData;
        const {firstName, lastName} = this.state.trainer;
        const occupancy = this.state.accountSignedCourses.length;

        return (
            <div className="container text-center">
                <h2>Detail kurzu </h2>
                <div className="align-items-center">
                    <div class="panel panel-info align-items-center text-center">
                        <div class="panel-heading">
                            <h3 class="panel-title">{this.props.location.courseName}</h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-2 col-lg-2 " align="center"></div>

                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                        <tr>
                                            <td><b>Název:</b></td>
                                            <td>{coursesData.name}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Popis:</b></td>
                                            <td>{coursesData.description}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Trenér:</b></td>
                                            <td>{firstName} {lastName}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Počet konání:</b></td>
                                            <td>{coursesData.count}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Cena:</b></td>
                                            <td>{coursesData.price}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Obsazenost:</b></td>
                                            <td>{occupancy}/{coursesData.maxCapacity}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Od:</b></td>
                                            <td>{coursesData.beginDate}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Do:</b></td>
                                            <td>{coursesData.endDate}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <a href="#" class="btn btn-primary">Upravit</a>
                                    <a href="#" class="btn btn-danger">Smazat</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default CourseDetailPage;
