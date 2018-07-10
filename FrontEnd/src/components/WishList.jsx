import React from 'react';

class Wish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wishList: []
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
                wishList: data.wishMovies
            })
        });
    }   

    render() {
        if(this.state.wishList.length === 0) {
            return (
                <section className="p-0" id="WishList">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters popup-gallery">
                            <h2 className="namestyle">Wish List</h2>
                            <div className="card-group">
                                No wish
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        else {
            return (
                <section className="p-0" id="WishList">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <h2 className="namestyle">Wish List</h2>
                            <div className="card-group">
                                <ul className="wishList">
                                    {this.state.wishList.map((x) => 
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
}
export default Wish;
