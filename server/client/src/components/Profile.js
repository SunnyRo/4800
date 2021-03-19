import { compareSync } from 'bcryptjs';
import React, { Component } from 'react'
import AuthenticationService from './Authentication';
import "./css/Profile.css"
import Header from './Header';
export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            token: '',
        };
    }
    // componentDidMount() {
    //     const name = AuthenticationService.getCurrentUser();
    //     if (name) {

    //         this.setState({
    //             email: name.email,
    //             token: name.accesstoken
    //         });
    //     }
    // }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="profile">
                    <div className="profile__header">This is profile Dashboard</div>
                    <div className="profile__body">
                        <div className="profile__columnLeft">
                            <div className="profile__image"></div>
                            <div className="profile__text">My profile</div>
                            <div className="profile__text">My profile</div>
                        </div>
                        <div className="profile__columnRight">
                            <div className="profile_smallBlock"></div>
                            <div className="profile_smallBlock"></div>
                        </div>
                    </div>
                </div>
                <div className="fixingFooter"></div>
            </div>
        );
    }
}

export default Profile
