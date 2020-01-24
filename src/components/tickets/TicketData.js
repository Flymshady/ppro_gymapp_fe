import React, {Component} from 'react';
import '../../styles/Table.css';

class TicketPage extends Component {

    header = ["Název", "Datum nákupu", "Datum vypršení", "Platnost", "Typ"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                    <th key={i}>{h}</th>
            )
        })
    }

    renderTableData() {
        return this.props.ticketData.map((ticket, index) => {
            const { id, name, beginDate, endDate, valid, ticketType } = ticket;
            let validString = "";
            if (valid === true) validString = "Platná";
            else validString = "Neplatná";
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    <td>{validString}</td>
                    <td>{ticketType.type}</td>
                </tr>
            )
        })
    }

    render() {
        console.log("Data: " + this.props.ticketData);
        if (this.props.ticketData.length === 0) {
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

export default TicketPage;
