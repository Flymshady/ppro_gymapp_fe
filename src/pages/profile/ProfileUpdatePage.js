import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {getAccountDetailUrl , updateAccountUrl} from "../../constants";

class ProfileUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            login: '',
            password : ''
        }
    }

    componentDidMount() {
        const {firstName, lastName, email, phoneNumber, login, password } = this.props.location.profilesData;
        this.setState({firstName : firstName, lastName : lastName, phoneNumber : phoneNumber,
            email : email, login : login, password : password});
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });

        fetch(updateAccountUrl + this.props.match.params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            },

        }).then(function (response) {
            if (response.ok) {
                alert("Účet byl upraven");
            } else {
                alert("Účet se nepodařilo upravit");
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return (
            <Form className="forms" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control defaultValue={this.state.firstName} name="firstName" type="text" placeholder="firstName" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Příjmení</Form.Label>
                    <Form.Control defaultValue={this.state.lastName} name="lastName" type="text" placeholder="lastName" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control defaultValue={this.state.phoneNumber} name="phoneNumber" type="number" placeholder="phoneNumber" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue={this.state.email} name="email" type="text" placeholder="email" required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control defaultValue={this.state.login} name="login" type="text" placeholder="login"
                                  required onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control defaultValue={this.state.password} name="password" type="password" placeholder="password" onChange={this.handleChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Upravit
                </Button>
            </Form>
        );
    }
}

export default ProfileUpdatePage;
