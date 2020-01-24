import React, {Component} from 'react';
import TicketData from '../components/tickets/TicketData';
import {ticketUrl} from '../constants/index';
import '../styles/Table.css'

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketData: []
        };
    }

    componentDidMount() {
        fetch(ticketUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ticketData: jsonResponse})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    render() {
        return (
            <div className="tables">
                <h2>
                    Přehled vašich permanentek
                </h2>
                <TicketData ticketData={this.state.ticketData}/>
            </div>
        );
    }
}

export default TicketPage;
