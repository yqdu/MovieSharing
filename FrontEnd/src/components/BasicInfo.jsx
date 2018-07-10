import React from 'react';

class BasicInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: window.location.pathname.split('/')[2],
            user: {
                username: localStorage.getItem('username'),
                email: "",
                portrait: ""
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/user/getUserByDbId/'+this.state.userId)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((e) => {
            console.log(e);
        })
        .then((message) => {
            console.log(message.profile);
            this.setState({
                user: {
                    username: message.username,
                    email: message.email,
                    portrait: message.profile
                }
            })
        })
    }

    render() {
        return (
            <div className="userProfile">
            <div className="span3 well">
                <center/>
                <img src={`../profilepictures/`+this.state.user.portrait}  name="aboutme" width="140" height="140" className="img-circle"/>
                <h3>{this.state.user.username}</h3>
                <em>{this.state.user.email}</em>
                <center/>
            </div>
        </div>
        )
    }
}
export default BasicInfo;