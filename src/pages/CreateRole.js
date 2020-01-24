import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createRoleUrl} from "../constants";

class CreateRole extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        fetch(createRoleUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: json
        }).then(function (response) {
            if(!response.ok) {
                alert("Roli se nepodařilo vytvořit");
            } else {
                alert("Role byla úspěšně vytvořena");
            }
            console.log(json);
            return response.text();
        }).then(function (text) {
            console.log(text)
        }).catch(function (error) {
            alert("Roli se nepodařilo vytvořit");
            console.error(error)
        });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název role</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Zadejte název role" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit roli
                </Button>
            </Form>

        )
    }
}

export default CreateRole;
