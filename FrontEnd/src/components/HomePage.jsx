import React from 'react';
import TopBar from './TopBar.jsx';
import MastTop from './MastTop.jsx';
import Top10 from './Top10.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import GitHubRepo from './GitHubRepo.jsx';
import '../style/css/creative.min.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("userinfo")
        };

        console.log(this.state.user)
    }
    render() {
        return (
            <div>
                <TopBar />
                <MastTop />
                <Top10 />
                <About />
                <GitHubRepo />
                {/* <Contact /> */}
    	    </div>
        )
    }
}

export default HomePage;