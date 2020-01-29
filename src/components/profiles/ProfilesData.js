import React, {Component} from 'react';
import '../../styles/Table.css';
import {Link} from "react-router-dom";
/*import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_ROLE
}
    from "../../components/authentication/AuthenticationService";*/
class ProfilesData extends Component {

    header = ["Login", "Role", "Detail"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableData() {
        return this.props.profilesData.map((profile, index) => {
            const { id, firstName, lastName, email, phoneNumber, login, role, password } = profile;
            const newTo = {
                pathname: "/profile/detail/" + id,
            };
            return (
                <tr key={id}>

                    <td>{login}</td>
                    <td>{role.name}</td>

                    <td><Link to={newTo}>{"zobrazit"}</Link></td>
                </tr>
            )
        })
    }


    render() {
        console.log("Data: " + this.props.profilesData);
        /*  const role = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
          if( role.name == "Client"){
              return (
                  <div>
                      <table id='tables'>
                          <tbody>
                              Jiny data
                          </tbody>
                      </table>
                  </div>
              );
          }else{*/
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
      //  }


    }
}

export default ProfilesData;
