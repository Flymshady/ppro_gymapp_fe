import React, {Component} from 'react';
import '../../styles/Table.css';

class TicketsData extends Component {

    header = ["Název","Klient", "Datum nákupu", "Datum vypršení", "Platnost"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                    <th key={i}>{h}</th>
            )
        })
    }

    renderTableData() {
        return this.props.ticketsData.map((ticket, index) => {
            const { id, beginDate, endDate, valid, ticketType, account } = ticket;
            let validString = "";
            if (valid === true) validString = "Platná";
            else validString = "Neplatná";
            return (
                <tr key={id}>
                    <td>{ticketType.name}</td>
                    <td>{account.login}</td>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    <td>{validString}</td>
                </tr>
            )
        })
    }

    render() {
        console.log("Data: " + this.props.ticketsData);
        if (this.props.ticketsData.length === 0) {
            return <p className="text-danger">Nemáte žádné permanentky</p>;
        } else {
            return (
                <div>
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default TicketsData;
