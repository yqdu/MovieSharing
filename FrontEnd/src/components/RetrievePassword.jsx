import React from 'react';
var clear = {
    clear: 'both'
}

class RetrievePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //waiting for the register api
    handleSubmit(event) {
        event.preventDefault();
        alert("An email has been sent to you, please check.");
    }
    render() {
        return (
            <form id="retrieve-form" className="col-lg-12" onSubmit={this.handleSubmit}>
                <div className="col-lg-12 logo-kapsul">
                    <img width="100" className="logo" src="https://selimdoyranli.com/cdn/material-form/img/logo.png" alt="Logo" />
                </div>

                <div style={clear}></div>
                <div className="group">
                    <input name="email" type="text" value={this.state.email} onChange={this.handleInput} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label><i className="material-icons input-ikon">mail_outline</i><span className="span-input">E-Mail</span></label>
                </div>
                <input className="sifre-hatirlat-buton" type="submit" value="Retrieve Password" />
                <a className="login-link" href="javascript:void('login-link');">Got the password ? Log In</a>
            </form>
        )
    }
}
export default RetrievePass;