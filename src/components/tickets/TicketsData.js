import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";
import {
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../authentication/AuthenticationService";

class TicketsData extends Component {

    constructor(props) {
        super(props);
    }

    header = ["Název", "Klient", "Datum nákupu", "Datum vypršení", "Platnost", "Detail", "Vstupy"];

    renderTableHeader(isEmployee) {
        if(!isEmployee) {
            const headerForClient = this.header.filter((h,i) => {
                return h !== 'Detail';
            });
            return headerForClient.map((h, i) => {
                return (
                    <th key={i}>{h}</th>
                )
            })
        } else {
            return this.header.map((h, i) => {
                return (
                    <th key={i}>{h}</th>
                )
            })
        }
    }

    renderTableValidTicket(isEmployee) {
        return this.props.ticketsData.map((ticket, index) => {
            const {id, beginDate, endDate, valid, ticketType, account} = ticket;
            let validString = "";
            if (valid) validString = "Platná";
            else validString = "Neplatná";
            const newTo = {
                pathname: "/ticket/detail/" + id,
            };
            const newTo2 = {
                pathname: "/ticket/entrance/" + id,
            };
            if (valid) {
                return (
                    <tr key={id}>
                        <td>{ticketType.name}</td>
                        <td>{account.login}</td>
                        <td>{beginDate}</td>
                        <td>{endDate}</td>
                        <td>{validString}</td>
                        {isEmployee && <td><Link to={newTo}>{"zobrazit"}</Link></td>}
                        <td><Link to={newTo2}>{"zobrazit"}</Link></td>
                    </tr>
                )
            }
        })
    }

    renderTableInValidTicket(isEmployee) {
        console.log(isEmployee)
        return this.props.ticketsData.map((ticket, index) => {
            const {id, beginDate, endDate, valid, ticketType, account} = ticket;
            let validString = "";
            if (valid) validString = "Platná";
            else validString = "Neplatná";
            const newTo = {
                pathname: "/ticket/detail/" + id,
            };
            const newTo2 = {
                pathname: "/ticket/entrance/" + id,
            };
            if (!valid) {
                return (
                    <tr key={id}>
                        <td>{ticketType.name}</td>
                        <td>{account.login}</td>
                        <td>{beginDate}</td>
                        <td>{endDate}</td>
                        <td>{validString}</td>
                        {isEmployee && <td><Link to={newTo}>{"zobrazit"}</Link></td>}
                        <td><Link to={newTo2}>{"zobrazit"}</Link></td>
                    </tr>
                )
            }
        })
    }

    render() {
        let isEmployee = false;
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if (roleName === 'Employee' || roleName === 'Admin') {
            isEmployee = true;
        } else {
            isEmployee = false;
        }
        if (this.props.ticketsData.length === 0) {
            if (isEmployee) {
                return <p className="text-danger">Nejsou k dispozici žádné permanentky</p>;
            } else {
                return <p className="text-danger">Nemáte žádné permanentky</p>;
            }
        } else {
            return (
                <div>
                    <h3>Platné permanentky</h3>
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader(isEmployee)}</tr>
                        {this.renderTableValidTicket(isEmployee)}
                        </tbody>
                    </table>
                    <h3>Neplatné permanentky</h3>
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader(isEmployee)}</tr>
                        {this.renderTableInValidTicket(isEmployee)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default TicketsData;
