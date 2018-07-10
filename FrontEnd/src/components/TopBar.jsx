import React from 'react';
import { Button, ButtonToolbar, FormGroup, Form} from 'react-bootstrap';
import { Link, IndexLink } from 'react-router-dom';
import Searching from './Searching.jsx';
import Category from './Categories.jsx';
import Auth from '../module/Auth';
import { WSAEINVALIDPROVIDER } from 'constants';

const Categories = [
    "Horror",
    "Animation",
    "Comedy",
    "Action",
    "Drama",
    "Western",
    "Fiction",
    "Romantic"
]

var loggedIn = Auth.isUserAuthenticated();//logged in or not
var curPage = window.location.pathname;

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("username"),
            userAccount: 
            Auth.isUserAuthenticated()?
            (<li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`/UserAccount/`+localStorage.getItem('userid')}>{localStorage.getItem("username")}</a>
            <a className="nav-link js-scroll-trigger" href="/" onClick={this.handleLogout}>Log Out</a>            
            </li>) :
            (<li className="nav-item">
            <Link className="nav-link js-scroll-trigger" to="/Login" onClick={window.location.reload}>Log In</Link>
            </li>)
        };

        this.handleLogout = this.handleLogout.bind(this);        
    }

    handleLogout(event) {
        Auth.deauthenticateUser();
        window.location.reload();
    }

    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-light fixed-top' id="mainNav">
    		    <div className="container">
                    <Link className="navbar-brand js-scroll-trigger" to="/" onClick={window.location.reload}>Movist</Link>
                    <Category categoryList={Categories}/>
                    <Button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <Searching />
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/#Top10" onClick={window.location.reload}>Top Ten Rated Movies</Link>
                            </li>         
                            {this.state.userAccount}
                        </ul>
                    </div>
                </div>
    	    </nav>
        )
    }
}

export default TopBar;