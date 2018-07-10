import React from 'react';
import '../style/css/Comment.css';

//temp
var comment = {
    userId: "userId",
    movieId: "movieId",
    username: "username",
    content: "content",
    rating: "rating",
    date: "date"
};

class ViewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: this.props.movieId,
            comments: [comment]
        };
    }

    async componentDidMount() {
        fetch('http://localhost:3001/comment/getmovieId/' + this.state.movieId)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((e) => {
            console.log(e);
        })
        .then((message) => {
            console.log(message);
            this.setState({
                comments: message
            })
        })
    }

    render() {
        return (
            <div id="app" className="comments">
                <div className="poster-kapsul">
                    <a className="giris-yap-buton" data-toggle="modal" data-target="#product_view" id={this.state.displayCongrats}>ADD COMMENT</a>
                </div>
                {this.state.comments.map((x) => 
                    <article>
                        <img id="profile-photo" src="https://en.gravatar.com/userimage/18343163/3fd908393aedf6423ec12cacec9a1f50.jpg?size=200" />
                        <h4><a href={`/UserAccount/`+x.userId}>{x.username}</a></h4>
                        <time>{x.date}</time>
                        <like></like>
                        <div>{x.rating}</div>
                        <p>{x.content}</p>
                    </article>
                )}
            </div>
        )
    }
}

export default ViewComment;