import React from 'react';
import Auth from '../module/Auth';
import MessageCard from './Message';

class MastTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: Auth.isUserAuthenticated()
        }

        this.handleClickUpload = this.handleClickUpload.bind(this);
    }
    
    handleClickUpload(event) {
        if(this.state.loggedIn) {
            window.location.pathname = '/UploadMovie';
        }
        else {
            alert("Please log In");
            window.location.pathname = '/Login';
        }
    }
    render() {
        return (
            <header className="masthead text-center text-white d-flex">
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <h1 className="text-uppercase">
                            <strong>Share favorites in Movist</strong>
                            </h1>
                            <hr />
                        </div>
                        <div className="col-lg-8 mx-auto">
                            <p className="text-faded mb-5">Start Movist can help you find out more movies you like! Just join us, post your favorite movies and enjoy!</p>
                            <a className="btn btn-primary btn-xl js-scroll-trigger" href="#" onClick={this.handleClickUpload}>Upload NOW</a>
                        </div>
                    </div>
                </div>
                <MessageCard/>
            </header>
        )
    }
}
export default MastTop;