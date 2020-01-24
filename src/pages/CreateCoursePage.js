import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../styles/Forms.css'
import {createCourseUrl} from '../constants/index';

class CreateTicketPage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        fetch(createCourseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: json
        }).then(function (response) {
            console.log(json)
            return response.text();
        }).then(function (text) {
            console.log(text)
        }).catch(function (error) {
            console.error(error)
        });
    }


    render() {
        return(
            <Form className="forms" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Název</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Název kurzu" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Popis</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Popis kurzu" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cena</Form.Label>
                    <Form.Control name="price" type="number" placeholder="Cena kurzu" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Kapacita</Form.Label>
                    <Form.Control name="maxCapacity" type="number" placeholder="Kapacita kurzu" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Začátek kurzu</Form.Label>
                    <Form.Control name="beginDate" type="date" placeholder="Datum a čas začátku kurzu" required />
                    <Form.Text className="text-muted">
                        Zadejte ve formátu YYYY-MM-DD
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Konec kurzu</Form.Label>
                    <Form.Control name="beginDate" type="text" placeholder="Datum konce kurzu" required />
                    <Form.Text className="text-muted">
                        Zadejte ve formátu YYYY-MM-DD
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Výběr trenéra</Form.Label>
                    <Form.Control name="trainer" as="select">
                        {this.state.ticketType.map((type, index) => {
                            return (
                                <option key={index}>{type}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit
                </Button>
            </Form>
        );

    }
}

export default CreateTicketPage;
