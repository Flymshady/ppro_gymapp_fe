import React, {Component} from 'react';
import ProfilesData from "../../components/profiles/ProfilesData";
import Loader from 'react-loader-spinner'
import AuthenticationService, {
    USER_NAME_SESSION_ATTRIBUTE_NAME, USER_NAME_SESSION_ATTRIBUTE_PASSWORD,USER_NAME_SESSION_ATTRIBUTE_ROLE
}
from "../../components/authentication/AuthenticationService";
import {getProfilesUrl} from "../../constants";
import ActualUserProfileData from "../../components/profiles/ActualUserProfileData";

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilesData: [],
            loading : true,
            isClient : false,
            actualClientData : []
        };
    }

    componentDidMount() {
        const roleName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
        console.log(roleName)
        if(roleName === 'Client') {
            this.setState({isClient: true})
        } else {
            this.setState({isClient : false})
        }

        fetch(getProfilesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({profilesData: jsonResponse, loading : false})
                console.log("response: " + jsonResponse)
            }).catch((err) => console.error(err));
    }

    render() {
        const { profilesData, loading, isClient } = this.state;
        let actualClientData;
        if(isClient) {
            const actualUserLogin = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
            actualClientData = profilesData.map((profile) => {return profile.login = actualUserLogin});
        }

        return (
            <div className="tables">
                <h2>
                    Přehled účtů
                </h2>

                {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/> :
                    (isClient ?
                        <ActualUserProfileData profileData={actualClientData}/> :
                            <ProfilesData profilesData={profilesData}/>
                    )
                }

            </div>
        );
    }
}

export default ProfilePage;
