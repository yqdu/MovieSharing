import React from 'react';
import TopBar from './TopBar';
import fetch from 'isomorphic-fetch';
import '../style/css/MovieList.css';

var movie = {
    name: "Movie Name",
    poster: "",
    id: "movieId"
}
class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [movie],
            headerTitle: ""
        };
    }

    async componentDidMount() {
        var curPage = window.location.pathname.split('/');
        if(curPage[1] === "MovieByKey") {
            //search movie by keyword
            var keyword = curPage[2];
            fetch("http://localhost:3001/movie/searchKeyword/" + keyword)
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
                    movieList: message,
                    headerTitle: "Search By Keyword"
                })
            })
        }
        else if(curPage[1] === "MovieByCategory") {
            var category = curPage[2];
            if(!curPage[3]) {
                //get movies by category
                fetch("http://localhost:3001/movie/searchByCategory/" + category)
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
                        movieList: message,
                        headerTitle: category.toUpperCase()
                    })
                })
            }
            else {
                //search by key in category
                var keyInCategory = curPage[3]
                fetch("http://localhost:3001/movie/searchInCategory/" + category + "/" + keyInCategory)
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
                        movieList: message,
                        headerTitle: 'Search In \"' + category.toUpperCase + '\"'
                    })
                })
            }
        }
    }

    render() {
        return (
            <div>
                <TopBar/>
                <div className="header">
                    <div className="header-title">{this.state.headerTitle}</div>
                </div>
        
                <div className="content">
                    <div className="gal">
                        {this.state.movieList.map((x) => <a key={x._id} href={`/MovieDetail/`+x._id}><img src={`../processedposters/`+x.poster} alt={x.name} /></a>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieList;