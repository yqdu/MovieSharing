import React from 'react';

class ReceivedMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receivedMessage: [],
        }
    }

    async componentDidMount() {
        let self = this;
        let username = localStorage.getItem('username');

        fetch('http://localhost:3001/sharemessage/getreceiverName/' + username, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
          }).then((response) =>  {
              return response.json();
          }).then((data) => {
              console.log(data)
            self.setState({
                receivedMessage: data
            })
        });
    }

    render() {
        return (
            <section className="p-0" id="receivedMessage">
            <div className="container-fluid p-0">
                <div className="row no-gutters">
                    <h2 className="namestyle">Shared From Others</h2>
                    <div className="card-group">
                        <ul className="wishList">
                            {this.state.receivedMessage.map((x) => 
                                <li className="col-lg-6 col-sm-6" key={x._id}> 
                                    {/* <a href={`/UserAccount/`+x.senderId}>View Sender</a><br/>
                                    <a href={`/MovieDetail/`+x.movieId}>View Shared Movie</a> */}
                                    <div className="messageDetail">Sender: {x.senderName}</div>
                                    <div className="messageDetail">Movie: {x.movieName}</div>                                    
                                    <div className="card-title watched" key={x._id}>Message: {x.message}</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default ReceivedMessage;