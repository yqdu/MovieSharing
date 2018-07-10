import React from 'react';
import request from 'superagent';
import '../style/css/message.css';

class MessageCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            senderId: localStorage.getItem("userid"),
            senderName: localStorage.getItem("username"),
            receiverName: "",
            receiverId: "",
            message: "",
            movieId: "",
            movieName: ""
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleInput(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSend(event) {
        event.preventDefault();
        //get user id by user name
        // fetch("http://localhost:3001/user/getUserByUsername/"+this.state.receiverName)
        // .then((response) => {
        //     console.log(response);
        //     return response.json();
        // })
        // .catch((e) => {
        //     console.log(e);
        //     alert("No such user")
        // })
        // .then((message) => {
        //     console.log(message);
        //     this.setState({
        //         receiverId: message._id
        //     })
        // })
        // //get movie id by movie name
        // fetch("http://localhost:3001/movie/getmoviebyname/"+this.state.movieName)
        // .then((response) => {
        //     console.log(response);
        //     return response.json();
        // })
        // .catch((e) => {
        //     console.log(e);
        //     alert("No such movie")
        // })
        // .then((message) => {
        //     console.log(message);
        //     this.setState({
        //         movieId: message._id
        //     })
        // })
        //send message
        var sendMessage = {
            "senderName": this.state.senderName,
            "receiverName": this.state.receiverName,
            "movieName": this.state.movieName,
            "message": this.state.message
        }
        request.post("http://localhost:3001/sharemessage/")
        .send(sendMessage)
        .end((err, resp) =>{
            if (resp.body.success == false) 
            { 
              console.log("internal error:");
              console.error(err);
              console.error(resp);
            }
            else{
              console.log(resp);
            //   this.setState({
            //     receiverName: "",
            //     receiverId: "",
            //     message: "",
            //     movieId: "",
            //     movieName: ""
            //   })
              alert("Submitted");
            }
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSend}>
            <div className="round hollow text-center">
                <a href="#" className="open-btn" id="addClass"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
            </div>
            <div className="popup-box chat-popup" id="qnimate">
                <div className="popup-head">
                    <input name="receiverName" className="receiverName" type="text" placeholder="Receiver"
                    value={this.state.receiverName} onChange={this.handleInput} required />
                    <div className="popup-head-right pull-right">
                        <button data-widget="remove" id="removeClass" className="chat-header-button pull-right" type="button"><i class="material-icons">clear</i></button>
                    </div>
                </div>
                <div className="popup-messages-footer">
                    <textarea name="movieName" id="status_message" rows="10" cols="40" placeholder="Movie Name"
                    value={this.state.movieName} onChange={this.handleInput} required />
                    <textarea id="status_message" value={this.state.message} placeholder="Leave a message" rows="10" cols="40" name="message" onChange={this.handleInput}></textarea>
                    <div className="btn-footer">
                        <button type="submit" className="bg_none">Submit</button>
                    </div>
                </div>
            </div>
        </form>
        )
    }
}

export default MessageCard;