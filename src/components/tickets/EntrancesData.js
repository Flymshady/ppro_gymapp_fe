import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,
    USER_NAME_SESSION_ATTRIBUTE_ROLE
} from "../authentication/AuthenticationService";
import {Button} from "react-bootstrap";
import {
    createEntranceUrl, getAccountDetailUrl, getEntranceDetailUrl,
    removeEntranceUrl, updateEntranceEndDateUrl,
    updateEntranceUrl
} from "../../constants";

class EntrancesData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // TODO zapsat jen kdyz je odepsano
            canAddEntrance: true
        }
    }

    header = ["Začátek vstupu", "Konec vstupu", "Možnosti"];

    renderTableHeader(isEmployee) {
        if (!isEmployee) {
            const headerForClient = this.header.filter((h, i) => {
                return h !== 'Možnosti';
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

    renderTableData(isEmployee) {
        return this.props.entrances.map((entrance, index) => {
            const {id, beginDate, endDate} = entrance;
            const newTo = {
                pathname: "/ticket/entrance/update/" + id,
                entranceData: entrance
            };
            return (
                <tr key={id}>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    {isEmployee && <td>
                        <Button onClick={() => this.handleEndEntrance(id)} className="btn btn-primary">Zapsat odchod</Button>
                        <Link to={newTo} className="btn btn-secondary">Upravit</Link>
                        <Button onClick={() => this.handleDelete(id)} className="btn btn-danger btn-space">Smazat</Button>
                    </td>}
                </tr>
            )
        })
    }

    handleAddEntrance = () => {
        let actualDateTime = new Date();
        let object = {};
        object["beginDate"] = actualDateTime;
        let json = JSON.stringify(object);
        console.log(this.props.ticketId);

        fetch(createEntranceUrl + this.props.ticketId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Vstup byl zapsán");
                window.location.reload();
            } else {
                response.json().then(function (res) {
                    alert(res.message)
                })
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    };

    handleEndEntrance = (id) => {
        let actualDateTime = new Date();
        let object = {};

        object["endDate"] = actualDateTime;
        let json = JSON.stringify(object);

        fetch(updateEntranceEndDateUrl + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization': AuthenticationService.createBasicAuthToken(sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_NAME), sessionStorage
                    .getItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD))
            },
            body: json
        }).then(function (response) {
            if (response.ok) {
                alert("Odchod byl zapsán");
                window.location.reload();
            } else {
                alert("Odchod se nepodařilo zapsat");
            }
        }).then(function (text) {
        }).catch(function (error) {
            console.error(error)
        });
    };

    handleDelete = (id) => {
        fetch(removeEntranceUrl + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    alert("Vstup byla úspěšně smazán");
                    window.location.reload();
                } else {
                    alert("Vstup se nepodařilo smazat");
                }
            }).then((text) => {
        }).catch((err) => console.error(err));

    }

    render() {
        const canAddEntrance = this.state.canAddEntrance;
        let isEmployee = false;
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        if (roleName === 'Employee' || roleName === 'Admin') {
            isEmployee = true;
        } else {
            isEmployee = false;
        }
        if (this.props.entrances.length === 0) {
            return (
                <div>
                    <p className="text-danger">Nejsou k dispozici žádné vstupy</p>
                    {canAddEntrance && this.props.isValid && <Button onClick={this.handleAddEntrance} className="btn btn-primary">
                        Zapsat vstup</Button>}
                </div>
            );
        } else {
            return (
                <div>
                    <h3>Vstupy:</h3>
                    {canAddEntrance && this.props.isValid && <Button onClick={this.handleAddEntrance} className="btn btn-primary">
                        Zapsat vstup</Button>}
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader(isEmployee)}</tr>
                        {this.renderTableData(isEmployee)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default EntrancesData;
