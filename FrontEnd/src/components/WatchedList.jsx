import React from 'react';

class Watched extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchedList: []
        }
    }

    async componentDidMount() {
        let self = this;
        let userId = window.location.pathname.split('/')[2];

        fetch('http://localhost:3001/user/getUserByDbId/' + userId, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
          }).then((response) =>  {
              return response.json();
          }).then((data) => {
            console.log(data.wishMovies);
            self.setState({
                watchedList: data.watchedMovies
            })
        });
    } 
    render() {
        return (
            <section className="p-0" id="WatchedList">
                <div className="container-fluid p-0">
                    <div className="row no-gutters popup-gallery">
                        <h2 className="namestyle watched">Watched List</h2>
                        <div className="card-group">
                            <ul className="watchedList">
                                {this.state.watchedList.map((x) => 
                                    <li className="col-lg-6 col-sm-6" key={x._id}> 
                                        <div className="card-title watched" key={x._id}><a href={`../processedposters/`+x.poster}>{x.name}</a></div>   
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
export default Watched;
