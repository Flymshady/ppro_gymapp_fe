import React, {Component} from 'react';
import TicketsData from '../components/tickets/TicketsData';
import {getTicketsUrl} from '../constants/index';
import '../styles/Table.css'
import Loader from "react-loader-spinner";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketsData: [],
            loading : true
        };
    }

    componentDidMount() {
        fetch(getTicketsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ticketsData: jsonResponse, loading : false})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }


    render() {
        const { ticketsData, loading } = this.state;
        return (
            <div className="tables">
                <h2>
                    Přehled vašich permanentek
                </h2>
                {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/> :
                <TicketsData ticketsData={ticketsData}/>}
            </div>
        );
    }
}

export default TicketPage;
