import React from 'react';
import '../style/css/Searching.css';

class Searching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchKey: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var curPage = window.location.pathname;
        if(curPage == "/") {//Homepage
            window.location.pathname = "/MovieByKey/" + this.state.searchKey;
        }
        else {
            window.location.pathname += "/" + this.state.searchKey;            
        }
    }

    render() {
        return (            
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                    <form onSubmit={this.handleSubmit} role="search">
                        <div className="input-group">
                        <input className="form-control" name="srch-term" id="ed-srch-term" type="text" value={this.state.searchKey} onChange={this.handleChange} />
                        <div className="input-group-btn">
                            <button type="submit" id="searchbtn">search</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Searching;