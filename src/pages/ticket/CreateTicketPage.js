import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/Forms.css'
import {createTicketUrl} from '../../constants/index';

class CreateTicketPage extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            ticketType: ["FITNESS", "POWERLIFTING", "CARDIO"]
        };
    }

    componentDidMount() {
        //TODO vzor pro filtrace dle atributu
        /*fetch(ticketUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                let ticketTypes = jsonResponse.map(function(type,i) {
                    return type.ticketType.type;
                });
                this.setState({ticketType:ticketTypes})
                console.log(jsonResponse)
            }).catch((err) => console.error(err));
         */
    }



    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};

        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        fetch(createTicketUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
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
            <Form className="forms" id="createTicket" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Název permanentky" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Datum nákupu</Form.Label>
                    <Form.Control name="beginDate" type="text" placeholder="Datum nákupu permanentky" required />
                    <Form.Text className="text-muted">
                        Zadejte ve formátu YYYY-MM-DD
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Typ permanentky</Form.Label>
                    <Form.Control name="ticketType" as="select">
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
