import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createAccountUrl, getRolesUrl} from "../constants";

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            roles: [],
            role: '',
        };
    }

    componentDidMount() {
        fetch(getRolesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({roles: jsonResponse})
                //console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    handleChange = (event) => {
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        /*if (data.has("roleName")) {
            let role = data.get("roleName");
            this.setState({role : role})
            //data.set("roleName", "{" + roleName + "}");
        }*/

        const roleName = data.get("roleName");


        /*for (let pair of data.entries()) {
            console.log(pair[0] + "," + pair[1])
        }*/
        let json = JSON.stringify(object);

        fetch(createAccountUrl + roleName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
                /*'authorization': AuthenticationService.createBasicAuthToken
                (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME),
                    sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))*/
            },
            body: json
        }).then(function (response) {
            if(response.ok) {
                alert("Účet byl vytvořen");
            } else {
                alert("Účet se nepodařilo vytvořit");
            }
        }).then(function (text) {
            //console.log(text)
        }).catch(function (error) {
            //console.error(error)
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="Vaše jméno" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Přijmení</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Vaše přijmení" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control name="login" type="text" placeholder="Váš login" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Zadejte Vaše heslo" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Zadejte Váš email" required/>
                    <Form.Text className="text-muted">
                        Váš e-mail nikdy nebudeme sdílet s nikým jiným.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Telefonní číslo</Form.Label>
                    <Form.Control name="phoneNumber" type="number" placeholder="Zadejte Vaše heslo" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control name="roleName" as="select" required>
                        {this.state.roles.map((role, index) => {
                            return (
                                <option key={index}>{role.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit účet
                </Button>
            </Form>

        )
    }
}

export default RegisterPage;
