import React from 'react';
import TopBar from './TopBar';
import ViewComment from './ViewComment';
import AddComment from './AddComment';
import fetch from 'isomorphic-fetch';
import Auth from '../module/Auth';
import request from 'superagent';
import FormData from 'form-data';
import '../style/css/MovieDetail.css'

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: this.props.match.params.movieId,
            movie: {
                category: "message.category",
                commentNum: "message.commentNum",
                description: "message.description",
                directors: [],
                name: "message.name",
                poster: "message.poster",
                rating: "message.score",
                screenshots: "message.screenShots",
                starring: [],
                watchedUsers: [],
                wishingUsers: [],
                screenplay: [],
                year: "message.year"
            },
            displayMovie: "show",
            displayUpdate: "hide",
            newName: "",
            newYear: "",
            newDirectors: "",
            newStars: "",
            newWriters: "",
            newDescription: "",
            newCategory: ""
        };

        this.markWatched = this.markWatched.bind(this);
        this.addWishList = this.addWishList.bind(this);
        this.switchToUpdate = this.switchToUpdate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async componentDidMount() {
        var movieId = window.location.pathname.split('/')[2];
        fetch("http://localhost:3001/movie/getMovieById/" + movieId)
        .then((response) => {
            return response.json();
        })
        .catch((e) => {
            console.log(e);
        })
        .then((message) => {
            this.setState({
                movieId: movieId,
                movie: {
                    category: message.category,
                    commentNum: message.commentNum,
                    description: message.description,
                    directors: typeof message.directors === "string"? message.directors.split(','):message.directors,
                    name: message.name,
                    poster: message.poster,
                    rating: message.score,
                    screenshots: message.screenShots,
                    starring: typeof message.stars === "string"? message.stars.split(','):message.stars,
                    watchedUsers: message.watchedUsers,
                    wishingUsers: message.wishingUsers,
                    screenplay: typeof message.writers === "string"? message.writers.split(','):message.writers,
                    year: message.year
                },
                newName: message.name,
                newYear: message.year,
                newDirectors: message.directors,
                newStars: message.stars,
                newWriters: message.writers,
                newDescription: message.description,
                newCategory: message.category
            })
        })
    }

    markWatched(event) {
        request.put('http://localhost:3001/user/watchedList/'+localStorage.getItem("userid")+"/"+this.state.movieId)
        .send({"id": localStorage.getItem("userid"), "movie": this.state.movieId})
        .end((err, resp) =>{
            if (resp.body.success == false) 
            { 
              console.log("internal error:");
              console.error(err);
              console.error(resp.body.message);
            }
            else {
                alert("Marked As Watched");
            }
        });
    }

    addWishList(event) {
        request.put('http://localhost:3001/user/wishList/'+localStorage.getItem("userid")+"/"+this.state.movieId)
        .send({"id": localStorage.getItem("userid"), "movie": this.state.movieId})
        .end((err, resp) =>{
            if (resp.body.success == false) 
            { 
              console.log("internal error:");
              console.error(err);
              console.error(resp.body.message);
            }
            else {
                alert("Added To WishList");
            }
        });
    }

    switchToUpdate(event) {
        this.setState({displayMovie: "hide"});
        this.setState({displayUpdate: "show"});
    }

    handleInput(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    handleUpdate(event) {
        fetch('http://localhost:3001/movie/'+this.state.movieId, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "name": this.state.newName,
                "year": this.state.newYear,
                "directors": this.state.newDirectors.split(','),
                "stars": this.state.newStars.split(','),
                "writers": this.state.newWriters.split(','),
                "description": this.state.newDescription,
                "category": this.state.newCategory
            })
          }).then((response) =>  {
              return response.json();
          }).then((data) => {
              console.log(data);
        });
    }

    render() {
        return (
            <div>
                <TopBar/>
                <div className="movieDetail-card">
                    <div className="movieDetailCard">
                        <div className="poster-kapsul">
                            <img className="poster" src={`../processedposters/`+this.state.movie.poster} alt={this.state.movie.name} />
                            <a className="giris-yap-buton" href="#" onClick={this.switchToUpdate} id={this.state.displayMovie}>UPDATE</a>
                            <a className="giris-yap-buton" href={`/MovieDetail/`+this.state.movieId} id={this.state.displayUpdate}>CANCEL</a>                            
                        </div>

                        <div className="col-lg-12" id={this.state.displayMovie}>
                            <div className="movieDetail-group">
                                <div className="movieName">{this.state.movie.name}</div>
                                <div className="releaseYear">{this.state.movie.year}</div>
                                <div className="aveRating">
                                    {this.state.movie.rating}
                                </div>
                                <div className="staff">
                                    <ul id="tree3">
                                        <li key="cast"><i className="material-icons">face</i><a href="#">CAST</a>
                                            <ul>
                                                {this.state.movie.starring.map((x)=> <li key={x}>{x}</li>)}
                                            </ul>
                                        </li>
                                        <li key="crew"><i className="material-icons">supervisor_account</i>CREW
                                            <ul>
                                                <li key="directors">DIRECTORS
                                                    <ul><ul>{this.state.movie.directors.map((x)=> <li key={x}>{x}</li>)}</ul></ul>
                                                </li>
                                                <li key="screenplay">SCRIPTED BY
                                                    <ul>{this.state.movie.screenplay.map((x)=> <li key={x}>{x}</li>)}</ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="description">
                                    <div>
                                        {this.state.movie.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="behavIcons" id={this.state.displayMovie}>
                            <button type="button" class = "btn btn-primary" onClick={this.markWatched}>Mark As Wached</button>
                            <button type="button" class = "btn btn-success" onClick={this.addWishList}>Add To WatchList</button>                                
                        </div>

                         {/*update  */}
                         <form onSubmit={this.handleUpdate}>
                         <div id={this.state.displayUpdate} className="col-lg-12">
                            <h2>{this.state.newName}</h2>
                            <br/>
                            <div className="upload-group">
                                <input name="newCategory" type="text" value={this.state.newCategory} onChange={this.handleInput} />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label><i className="material-icons input-ikon">view_list</i><span className="span-input">Category</span></label>
                            </div>

                            <div className="upload-group">
                                <input name="newYear" type="text" value={this.state.newYear} onChange={this.handleInput}  />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label><i className="material-icons input-ikon">date_range</i><span className="span-input">Release Year</span></label>
                            </div><br/>

                            <div className="upload-group">
                                <input name="newDirectors" type="text" value={this.state.newDirectors} onChange={this.handleInput}  />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label><i className="material-icons input-ikon">videocam</i><span className="span-input">Directed By</span></label>
                            </div>
                        
                            <div className="upload-group">
                                <input name="newStars" type="text" value={this.state.newStars} onChange={this.handleInput}  />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label><i className="material-icons input-ikon"><i className="material-icons">movie_filter</i></i><span className="span-input">Starring</span></label>
                            </div>

                            <div className="upload-group">
                                <input name="newWriters" type="text" value={this.state.newWriters} onChange={this.handleInput}  />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label><i className="material-icons input-ikon">assignment</i><span className="span-input">Screenplay By</span></label>
                            </div>
                            <br/>

                            <div className="upload-group">
                                <textarea name="newDescription" value={this.state.newDescription} onChange={this.handleInput} cols="50"  />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label><i className="material-icons input-ikon">description</i><span className="span-input">Brief Description</span></label>
                            </div>
                            <br/>
                            <div className="behavIcons" id={this.state.displayUpdate}>
                                <button type="submit" class = "btn btn-primary">SUBMIT</button>
                            </div>
                            <output id="result" />
                        </div>
                        </form>
                    </div>
                </div>
                    
                <div className="comment-card">
                <ViewComment movieId={this.state.movieId} movie={this.state.movie}/>
                </div>
                <AddComment movie={this.state.movie} />
    	    </div>
        )
    }
}
export default MovieDetail;