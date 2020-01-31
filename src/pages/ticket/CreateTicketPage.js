import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/Forms.css'
import {createTicketUrl, getAllClients, getTicketTypes} from '../../constants/index';

class CreateTicketPage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            accounts: [],
            account: '',
            beginDate: '',
            endDate: '',
            valid: 'TRUE',
            entrances: '',
            ticketTypes: [],
            ticketType:''
        };
    }

    //  componentDidMount() {
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
    //   }
    componentDidMount() {
        fetch(getAllClients, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({accounts: jsonResponse})
                this.setState({account: jsonResponse[0]});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));

        fetch(getTicketTypes, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ticketTypes: jsonResponse})
                this.setState({ticketType : jsonResponse[0]});
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};

        data.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        const accountId = data.get("accountId");
        const ticketTypeId = data.get("ticketTypeId");

        fetch(createTicketUrl +"/"+ accountId +"/"+ ticketTypeId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            body: json
        }).then(function (response) {
            if(response.ok) {
                alert("Permanentka byla vytvořena");
            } else {
                alert("Permanentku se nepodařilo vytvořit");
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    }


    render() {
        return(
            <Form className="forms" id="createTicket" onSubmit={this.handleSubmit}>

                <Form.Group>
                    <Form.Label>Výběr typu</Form.Label>
                    <Form.Control name="ticketTypeId" as="select" onChange={this.handleChange} required>
                        {this.state.ticketTypes.map((ticketType, index) => {
                            return (
                                <option key={index} value={ticketType.id}>{ticketType.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Výběr klienta</Form.Label>
                    <Form.Control name="accountId" as="select" onChange={this.handleChange} required>
                        {this.state.accounts.map((account, index) => {
                            return (
                                <option key={index} value={account.id}>{account.firstName} {account.lastName}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Začátek platnosti</Form.Label>
                    <Form.Control name="beginDate" type="datetime-local" placeholder="Datum nákupu permanentky" required />
                    <Form.Text className="text-muted">
                        Zadejte ve formátu YYYY-MM-DD
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Konec platnosti</Form.Label>
                    <Form.Control name="endDate" type="datetime-local" placeholder="Datum nákupu permanentky" required />
                    <Form.Text className="text-muted">
                        Zadejte ve formátu YYYY-MM-DD
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit
                </Button>
            </Form>
        );

    }
}

export default CreateTicketPage;
