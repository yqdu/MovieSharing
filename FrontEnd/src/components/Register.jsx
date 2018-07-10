import React from 'react';
import fetch from 'isomorphic-fetch';
import request from 'superagent';
var FormData = require('form-data');

var clear = {
    clear: 'both'
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            email: "",
            password: "",
            confirmPassword: "",
            portrait: ""
        };
    
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPortrait = this.addPortrait.bind(this);
    }

    handleInput(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    addPortrait(event) {
        console.log("in portrait")
        this.setState({
            portrait: event.target.files[0]
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        if(this.state.confirmPassword != this.state.password) {
            alert("Confirm password doesn't match");
            
        }
        else {
            var register = new FormData();
            register.append('username',this.state.username);
            register.append('email',this.state.email);
            register.append('password',this.state.password);
            register.append('profile',this.state.portrait);

            request.post('http://localhost:3001/user/signup')
            .send(register)
            .end((err, resp) =>{
                if (resp.body.success == false) 
                { 
                  console.log("internal error:");
                  console.error(err);
                  console.error(resp.body.message);
                }
                else{
                    alert("Register successfully");
                    window.location.replace('/Login')
                }
            });  
        }
    }

    render() {
        return (
            <form id="register-form" className="col-lg-12" onSubmit={this.handleSubmit}>
                <div className="col-lg-12 logo-kapsul">
                    <img width="100" className="logo" src="https://selimdoyranli.com/cdn/material-form/img/logo.png" alt="Logo" />
                </div>
        
                <div style={clear}></div>
                <div className="group">
                    <input name="username" value={this.state.username} onChange={this.handleInput} type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label><i className="material-icons input-ikon">person_outline</i><span className="span-input">User name</span></label>
                </div>
                <div className="group">
                    <input name="email" type="text" value={this.state.email} onChange={this.handleInput} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label><i className="material-icons input-ikon">mail_outline</i><span className="span-input">E-Mail</span></label>
                </div>
                <div className="group">
                    <input name="password" type="password" value={this.state.password} onChange={this.handleInput} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label><i className="material-icons input-sifre-ikon">lock</i><span className="span-input">Password</span></label>
                </div>
                <div className="group">
                    <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleInput} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label><i className="material-icons input-sifre-ikon">lock</i><span className="span-input">Password Again</span></label>
                </div>
                <div className="poster-kapsul">
                    <a className="giris-yap-buton" data-toggle="modal" data-target="#addPortrait">Upload Portrait</a>
                    <input className="kayit-ol-buton" type="submit" value="Register" />
                </div>
                <a className="login-link" href="javascript:void('login-link');">Already have an account ? Log In.</a>

                {/* add portrait */}
                <div className="modal fade addPortrait" id="addPortrait">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 product_content">
                                        <input onChange={this.addPortrait} type="file" name="portrait" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
export default Register;